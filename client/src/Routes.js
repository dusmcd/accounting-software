import { Switch, Route } from 'react-router-dom';
import { Bills, Home, Invoices, Journals, Contacts, Accounts } from './components';

function Routes() {
    return (
        <Switch>
            <Route path="/bills">
                <Bills />
            </Route>
            <Route path="/contacts">
                <Contacts />
            </Route>
            <Route path="/invoices">
                <Invoices />
            </Route>
            <Route path="/journals">
                <Journals />
            </Route>
            <Route path='/coa'>
                <Accounts />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>               
        </Switch>
    )
}

export default Routes;