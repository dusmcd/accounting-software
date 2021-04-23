import React from 'react';
import CreateBill from './CreateBill';
import ShowBill from './ShowBill';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

function Bill() {
    const match = useRouteMatch();
    return (
        <div>
            <ul>
                <li><Link to={`${match.url}/create`}>Create Bill</Link></li>
            </ul>
            <Switch>
                <Route exact path={`${match.path}/create`}>
                    <CreateBill />
                </Route>
                <Route path={`${match.path}/:id`}>
                    <ShowBill />
                </Route>
            </Switch>
        </div>
    )
}

export default Bill;