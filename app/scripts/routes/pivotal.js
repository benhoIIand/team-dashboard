/**
 * @jsx React.DOM
 */

var React = require('react');
require('react/addons');

var xhr = require('xhr');

var token = 'ce243567930fc7ce6231f77ed2c61242',
    projectId = '848509',
    apiUrl = 'https://www.pivotaltracker.com/services/v5/projects/' + projectId + '/stories';

module.exports = React.createClass({

    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
        return {
            label: '',
            tickets: []
        };
    },

    getTickets: function() {
        var query = '?filter=labels:'+ this.state.label +'&limit=10';

        xhr({
            uri: apiUrl + query,
            headers: {
                'X-TrackerToken': token
            }
        }, function (err, resp, body) {
            this.setState({
                tickets: JSON.parse(body)
            });
        }.bind(this));
    },

    componentDidMount: function() {
        this.getTickets();
    },

    render: function() {
        var extractLabel = function(obj) {
            return obj.name;
        };

        var tickets = this.state.tickets.map(function(ticket) {
            return (
                <div className="col-xs-6 col-sm-6 col-md-4">
                    <div className={ 'ticket ticket--' + ticket.story_type.toLowerCase() }>
                        <h4 className="ticket__title">{ ticket.name }</h4>
                        <p className="ticket__labels meta">{ ticket.labels.map(extractLabel).join(', ') }</p>
                        <p className="ticket__description">{ ticket.description }</p>
                        <div className="ticket__footer">
                            <span className="meta pull-right">{ ticket.story_type }</span>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <div className="row no-print tickets-search">
                    <div className="input-group col-md-3 col-centered">
                        <input className="form-control" type="text" placeholder="Label" valueLink={this.linkState('label')} />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" onClick={this.getTickets}>Find tickets</button>
                        </span>
                    </div>
                </div>
                <div className="row">
                    { tickets }
                </div>
            </div>
        );
    }

});

/* label:"needs feedback" */