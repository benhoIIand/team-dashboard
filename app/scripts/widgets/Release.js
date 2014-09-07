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
                tag_name: releases[0] ? releases[0].tag_name : '1.2.0'
            });
        }.bind(this));
    },

    render: function() {
        return (
            <div className="release">
                <h4 className="release__project">{this.props.name}</h4>
                <h1 className="release__number">{this.state.tag_name}</h1>
            </div>
        );
    }

});

module.exports = Release;
