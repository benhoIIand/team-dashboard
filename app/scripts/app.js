/**
 * @jsx React.DOM
 */

var React = require('react');

var Repo = require('./widgets/Repo');
var PullRequests = require('./widgets/PullRequests');
var GithubContributors = require('./widgets/GithubContributors');

var Dashboard = React.createClass({
    getInitialState: function() {
        return {items: [], text: ''};
    },
    onChange: function(e) {
        this.setState({text: e.target.value});
    },
    render: function() {
        return (
            <div className="row">
                <Repo org="hollandben" name="team-dashboard" size="3" />
            </div>
        );
    }
});


React.renderComponent(<Dashboard />, document.getElementById('dashboard'));
