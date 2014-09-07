/**
 * @jsx React.DOM
 */

var React = require('react');

var Panel = React.createClass({

    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <b><a href={this.props.link}>{this.props.name}</a></b>
                    <b><span className="panel__meta">{this.props.meta}</span></b>
                </div>
                <div className="panel-body">{this.props.children}</div>
            </div>
        );
    }

});

module.exports = Panel;
