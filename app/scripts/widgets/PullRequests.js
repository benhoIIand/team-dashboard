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

var removeWip = function(request) {
    return !(/\[wip\]/i).test(request.title);
};

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
            open: [],
            closed: []
        }
    },

    componentDidMount: function() {
        var repo = github.getRepo(this.props.org, this.props.name);

        // Get open requests
        repo.listPulls('open', function(err, pullrequests) {
            this.setState({
                open: pullrequests.filter(removeWip)
            });
        }.bind(this));

        // Get closed requests
        repo.listPulls('closed', function(err, pullrequests) {
            this.setState({
                closed: pullrequests
            });
        }.bind(this));
    },

    render: function() {
        var renderPullRequest = function(request) {
            return (
                <div className="media">
                    <a className="pull-left">
                        <img className="media-object avatar" src={request.user.avatar_url + '&s=40'} />
                    </a>
                    <div className="media-body">
                        <p className="media-heading pullrequest__title">
                            <a href={request.html_url}>{request.title}</a>
                        </p>
                        <time className="pullrequest__time">{moment(request.created_at).fromNow()}</time>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <div className="pullrequests">
                    <p><b>Awaiting Review</b></p>
                    {
                        this.state.open.length === 0
                        ? <p>None. Clearly people arent working hard enough</p>
                        : this.state.open.sort(earliestFirst('created_at')).map(renderPullRequest)
                    }
                </div>
                <div className="pullrequests closed">
                    <b>Recently Closed</b>
                    {this.state.closed.sort(earliestFirst('closed_at')).slice(0, 5).map(renderPullRequest)}
                </div>
            </div>
        );
    }

});

module.exports = PullRequests;
