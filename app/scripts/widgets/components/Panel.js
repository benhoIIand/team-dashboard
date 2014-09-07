/**
 * @jsx React.DOM
 */

var React = require('react');

var Panel = React.createClass({

    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <b>
                        <a href={this.props.link}>{this.props.name}</a>
                    </b>
                    <b className="panel__meta">
                        <span className="label label-success">Passing</span>
                        <span className="label label-danger">Failing</span>
                    </b>
                </div>
                <div className="panel-body">
                    {this.props.children}
                </div>
            </div>
        );
    }

});

module.exports = Panel;
