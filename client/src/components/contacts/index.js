import React from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import CreateContact from './CreateContact';

function Contacts () {
    const match = useRouteMatch();
    return (
        <div>
            <ul>
                <li><Link to={`${match.url}/create`}>Create Contact</Link></li>
            </ul>

            <Switch>
                <Route path={`${match.path}/create`}>
                    <CreateContact />
                </Route>
            </Switch>
        </div>
    )
}

export default Contacts;