/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var Projects = require('./routes/projects');
var Pivotal = require('./routes/pivotal');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <header className="header">
                    <ul className="nav nav-pills pull-right">
                        <li><Link to="projects">Projects</Link></li>
                        <li><Link to="pivotal">Pivotal</Link></li>
                    </ul>
                    <h3>Dat-A Team Dashboard</h3>
                </header>

                <div className="container-fluid">
                    { this.props.activeRouteHandler() }
                </div>
            </div>
        );
    }
});

var routes = (
    <Routes>
        <Route handler={App}>
            <DefaultRoute handler={Projects} />
            <Route name="projects" path="/" handler={Projects}/>
            <Route name="pivotal" path="pivotal" handler={Pivotal}/>
        </Route>
    </Routes>
);

React.render(routes, document.body);
