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
                <Repo name="weflubit" size="4" />
                <Repo name="mws" size="4" />
                <Repo name="fws" size="4" />
            </div>
        );
    }
});


React.renderComponent(<Dashboard />, document.getElementById('dashboard'));
