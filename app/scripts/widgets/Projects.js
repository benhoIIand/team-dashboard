/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('./components/Panel');

var Release = require('./Release');

var Github = require('github-api');

var github = new Github({
    token: "1fd5d9882cc7f5f161b472dc1f2ec65751726ffc",
    auth: "oauth"
});

var user = github.getUser('hollandben');

var repos = ['grunt-cache-bust', 'Pikaday', 'Slidorion'];

var onlyShowCertainRepos = function(repo) {
    return repos.indexOf(repo.name) !== -1;
};

var alphabetise = function(a, b) {
    return a.name.toLowerCase() > b.name.toLowerCase();
};

var Projects = React.createClass({

    getInitialState: function() {
        return {
            projects: []
        }
    },

    componentDidMount: function() {
        user.repos(function(err, projects) {
            if (this.isMounted()) {
                this.setState({
                    projects: projects.filter(onlyShowCertainRepos).sort(alphabetise)
                });
            }
        }.bind(this));
    },

    render: function() {
        var renderRelease = function(project) {
            return <Release name={project.name} />
        };

        return (
            <div className={'col-md-'+ this.props.size}>
                <Panel name="Projects">
                    {this.state.projects.slice(0, 5).map(renderRelease)}
                </Panel>
            </div>
        );
    }

});

module.exports = Projects;
