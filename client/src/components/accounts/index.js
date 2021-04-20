import { Container } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import axios from 'axios';

export default function Accounts() {
    const [accountTypes, setAccountTypes] = useState([]);
    const match = useRouteMatch();

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('/api/accounts?getDetails=true');
            const accountList = await res.data;
            setAccountTypes(accountList);
        }
        fetchData();
    }, [])
    if (accountTypes) {
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
                            <h1>Chart of Accounts</h1>
                            {accountTypes.map(type => {
                                return (
                                    <div key={type.id}>
                                        <h3 key={type.id}>{type.accountType}</h3>
                                        <ul>
                                            {type.Accounts.map(account => <li key={account.id}>{account.accountNumber} - {account.name}</li>)}
                                        </ul>
                                    </div>
                                )
                            })}
                        </Route>
                    </Switch>
                </Container>
            </div>
        )
    }
    return <h1>Chart of Accounts</h1>
}