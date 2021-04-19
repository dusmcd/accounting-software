import { Container } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Accounts() {
    const [accountTypes, setAccountTypes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('/api/accounts');
            const accountList = await res.data;
            setAccountTypes(accountList);
        }
        fetchData();
    }, [])
    if (accountTypes) {
        return (
            <Container>
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
            </Container>
        )
    }
    return <h1>Chart of Accounts</h1>
}