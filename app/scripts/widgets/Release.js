/**
 * @jsx React.DOM
 */

var React = require('react');

var Github = require('github-api');

var github = new Github({
    token: "1fd5d9882cc7f5f161b472dc1f2ec65751726ffc",
    auth: "oauth"
});

var Release = React.createClass({

    getInitialState: function() {
        return {
            tag_name: ''
        }
    },

    componentDidMount: function() {
        github.getRepo('hollandben', this.props.name +'/releases').show(function(err, releases) {
            this.setState({
                tag_name: releases[0] ? releases[0].tag_name : ''
            });
        }.bind(this));
    },

    render: function() {
        return (
            <h4>{this.props.name} - {this.state.tag_name}</h4>
        );
    }

});

module.exports = Release;
