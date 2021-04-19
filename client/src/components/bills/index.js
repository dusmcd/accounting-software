import React from 'react';
import CreateBill from './CreateBill';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

function Bill() {
    const match = useRouteMatch();
    return (
        <div>
            <ul>
                <li><Link to={`${match.url}/create`}>Create Bill</Link></li>
            </ul>
            <Switch>
                <Route path={`${match.path}/create`}>
                    <CreateBill />
                </Route>
            </Switch>
        </div>
    )
}

export default Bill;