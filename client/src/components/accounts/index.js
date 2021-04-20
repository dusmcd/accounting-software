import { Container } from 'semantic-ui-react';
import { Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import ChartofAccounts from './ChartOfAccounts';

export default function Accounts() {
    
    const match = useRouteMatch();
    return (
        <div>
            <ul>
                <li><Link to={`${match.url}/create`}>Create Account</Link></li>
                <li><Link to={`${match.url}`}>Chart of Accounts</Link></li>
            </ul>

            <Container>
                <Switch>
                    <Route path={`${match.path}/create`}>
                        <CreateAccount />
                    </Route>
                    <Route exact path={`${match.path}`}>
                        <ChartofAccounts />
                    </Route>
                </Switch>
            </Container>
        </div>
    )
    
}