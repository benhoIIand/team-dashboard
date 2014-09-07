/**
 * @jsx React.DOM
 */

var React = require('react');

var Panel = React.createClass({

    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <a href={this.props.link}>{this.props.name}</a>
                    <span className="panel__meta">{this.props.meta}</span>
                </div>
                <div className="panel-body">{this.props.children}</div>
            </div>
        );
    }

});

module.exports = Panel;
