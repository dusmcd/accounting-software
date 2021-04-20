import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChartOfAccounts() {
    const [accountTypes, setAccountTypes] = useState([]);

    useEffect(() => {
        async function fetchAccounts() {
            const res = await axios.get('/api/accounts?getDetails=true');
            const data = await res.data;
            setAccountTypes(data);
        }
        fetchAccounts();
    }, [])

    if (accountTypes) {
        return (
            <div>
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
            </div>
        )
    }
    return <h1>ChartOfAccounts</h1>
}