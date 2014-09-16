/**
 * @jsx React.DOM
 */

var xhr = require('xhr');
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
            release: '',
            builds: []
        }
    },

    componentDidMount: function() {
        var repo = github.getRepo(this.props.org, this.props.name),
            tagsPage1 = github.getRepo(this.props.org, this.props.name +'/tags?per_page=100&page=1'),
            tagsPage2 = github.getRepo(this.props.org, this.props.name +'/tags?per_page=100&page=2');

        repo.show(function(err, project) {
            this.setState({
                project: project
            });
        }.bind(this));

        var toInt = function(val) {
            return parseInt(val, 10);
        };

        var sortByVersion = function(a, b) {
            var aReleases = a.split('.').map(toInt),
                bReleases = b.split('.').map(toInt);

            // Sort by major
            if(aReleases[0] !== bReleases[0]) {
                return bReleases[0] - aReleases[0];
            }

            // Sort by minor
            if(aReleases[1] !== bReleases[1]) {
                return bReleases[1] - aReleases[1];
            }

            // Sort by hotfix
            if(aReleases[2] !== bReleases[2]) {
                return bReleases[2] - aReleases[2];
            }

            return 0;
        };

        tagsPage1.show(function(err, page1Tags) {
            tagsPage2.show(function(err, page2Tags) {

                var sortedTags = page1Tags.concat(page2Tags)
                    .filter(function(obj) {
                        return !(/[a-z]/i).test(obj.name);
                    })
                    .map(function(obj) {
                        return obj.name;
                    })
                    .sort(sortByVersion);

                this.setState({
                    release: sortedTags[0] ? sortedTags[0] : ''
                });
            }.bind(this));
        }.bind(this));

        xhr({
            uri: '/jenkins',
        }, function (err, resp, body) {
            this.setState({
                builds: JSON.parse(body).jobs
            });
        }.bind(this));
    },

    render: function() {
        var renderBuildLabel = function(name) {
            var status = this.state.builds.filter(function(build) {
                return name.toLowerCase() === build.name.toLowerCase();
            }).map(function(build) {
                return build.color === 'red' ? 'failing' : 'passing';
            })[0];

            return (
                status === 'passing'
                ? <span className="label label-success">Passing</span>
                : <span className="label label-danger">Failing</span>
            );
        }.bind(this);

        return (
            <div className={'col-md-'+ this.props.size}>
                <Panel name={this.props.name} link={'https://github.com/' + this.props.org +'/'+ this.props.name} meta={renderBuildLabel(this.props.name)}>
                    <div className="repo__version">
                        <b>Current Version:</b>
                        <h2>{this.state.release}</h2>
                    </div>
                    <PullRequests org={this.props.org} name={this.props.name} />
                </Panel>
            </div>
        );
    }

});

module.exports = Repo;
