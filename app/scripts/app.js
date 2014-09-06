/**
 * @jsx React.DOM
 */

var React = require('react');
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
                <GithubContributors size="4" />
            </div>
        );
    }
});


React.renderComponent(<Dashboard />, document.getElementById('dashboard'));
