/**
 * @jsx React.DOM
 */

var React = require('react');

var GithubUser = React.createClass({

    render: function() {
        return (
            <div className="media">
                <a className="pull-left">
                    <img className="media-object avatar" src={this.props.details.avatar_url + '&s=40'} />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.details.login}</h4>
                </div>
            </div>
        );
    }

});

module.exports = GithubUser;
