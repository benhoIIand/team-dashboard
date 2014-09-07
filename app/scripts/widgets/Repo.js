/**
 * @jsx React.DOM
 */

var React = require('react');
var Github = require('github-api');

var Panel = require('./components/Panel');
var Commits = require('./Commits');
var PullRequests = require('./PullRequests');

var github = new Github({
    token: "1fd5d9882cc7f5f161b472dc1f2ec65751726ffc",
    auth: "oauth"
});

var Repo = React.createClass({

    getInitialState: function() {
        return {
            project: {},
            release: ''
        }
    },

    componentDidMount: function() {
        var repo = github.getRepo(this.props.org, this.props.name),
            releases = github.getRepo(this.props.org, this.props.name +'/tags');

        repo.show(function(err, project) {
            this.setState({
                project: project
            });
        }.bind(this));

        releases.show(function(err, releases) {
            this.setState({
                release: releases[0] ? releases[0].name.replace(/v/ig, '') : ''
            });
        }.bind(this));
    },

    render: function() {
        return (
            <div className={'col-md-'+ this.props.size}>
                <Panel name={this.props.name} link={'https://github.com/' + this.props.org +'/'+ this.props.name} meta={this.state.release}>
                    <Commits org={this.props.org} name={this.props.name} />
                    <PullRequests org={this.props.org} name={this.props.name} />
                </Panel>
            </div>
        );
    }

});

module.exports = Repo;
