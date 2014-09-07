/**
 * @jsx React.DOM
 */

var React = require('react');

var Project = require('./widgets/Project');
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
                <Project name="weflubit" size="4" />
                <Project name="mws" size="4" />
                <Project name="fws" size="4" />
            </div>
        );
    }
});


React.renderComponent(<Dashboard />, document.getElementById('dashboard'));
