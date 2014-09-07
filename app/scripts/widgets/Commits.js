/**
 * @jsx React.DOM
 */

var React = require('react');
var Github = require('github-api');
var moment = require('moment');

var github = new Github({
    token: "1fd5d9882cc7f5f161b472dc1f2ec65751726ffc",
    auth: "oauth"
});

var earliestFirst = function(prop) {
    return function(a, b) {
        var aDate = +new Date(a[prop]),
            bDate = +new Date(b[prop])

        if (aDate < bDate) return 1;
        if (aDate > bDate) return -1;
        return 0;
    };
};

var PullRequests = React.createClass({

    getInitialState: function() {
        return {
            commits: []
        }
    },

    componentDidMount: function() {
        github
            .getRepo(this.props.org, this.props.name +'/commits')
            .show(function(err, commits) {
                console.log(commits);
                this.setState({
                    commits: commits
                });
            }.bind(this));
    },

    render: function() {
        var renderCommit = function(commit) {
            return (
                <div className="media">
                    <a className="pull-left">
                        <img className="media-object avatar" src={commit.author.avatar_url + '&s=40'} />
                    </a>
                    <div className="media-body">
                        <p className="media-heading pullrequest__title">
                            <a href={commit.html_url}>{commit.commit.message}</a>
                        </p>
                        <time className="pullrequest__time">{moment(commit.created_at).fromNow()}</time>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <div className="pullrequests">
                    <p><b>Latest Commits</b></p>
                    {this.state.commits.slice(0, 5).map(renderCommit)}
                </div>
            </div>
        );
    }

});

module.exports = PullRequests;
