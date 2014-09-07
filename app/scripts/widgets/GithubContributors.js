/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('./components/Panel');
var GithubUser = require('./GithubUser');

var Github = require('github-api');

var github = new Github({
    token: "1fd5d9882cc7f5f161b472dc1f2ec65751726ffc",
    auth: "oauth"
});

var repo = github.getRepo('hollandben', 'grunt-cache-bust/contributors');

var GithubContributors = React.createClass({

    getInitialState: function() {
        return {
            contributors: []
        }
    },

    componentDidMount: function() {
        repo.show(function(err, contributors) {
            if (this.isMounted()) {
                this.setState({
                    contributors: contributors
                });
            }
        }.bind(this));
    },

    render: function() {
        var createContributor = function(user) {
            return <GithubUser details={user} />;
        };

        return (
            <div className={'col-md-'+ this.props.size}>
                <Panel name="Contributors">
                    <div>{this.state.contributors.map(createContributor)}</div>
                </Panel>
            </div>
        );
    }

});

module.exports = GithubContributors;
