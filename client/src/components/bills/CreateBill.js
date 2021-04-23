import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom'



export default function CreateBill() {
    const [bill, setBill] = useState({
        date: '',
        dueDate: '',
        invoiceNumber: '',
        transactions: {},
        ContactId: 0,
        error: false
    });

    const [accounts, setAccounts] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [rows, setRows] = useState([1]);
    const history = useHistory();


    useEffect(() => {
        async function fetchData() {
            // get contacts and types to populate
            const res = await axios.get('/api/accounts-contacts');
            const data = await res.data;
            data.accounts = data.accounts.map(account => ({key: account.id, text: `${account.accountNumber} - ${account.name}`, value: account.id}));
            data.contacts = data.contacts.map(contact => ({key: contact.id, text: contact.name, value: contact.id}));
            setAccounts(data.accounts);
            setContacts(data.contacts)
        }

        fetchData();
    }, [])

    function addRow() {
        if (rows.length <= 5) {
            setRows([...rows, 1]);
        }
    }

    function handleDate(e) {
        setBill({...bill, [e.target.name]: e.target.value});
    }
    function handleChange(e, { name, value }) {
        setBill({...bill, [name]: value});
    }
    function handleAccounts(e, { name, value }) {
        const sentValue = name.includes('amount') ? Number(value) : value;
        setBill({...bill, transactions: {...bill.transactions, [name]: sentValue}})
    }
    async function handleSubmit(e) {
        try {
            e.preventDefault();
            await axios.post('/api/bills', bill);
            history.push('/');
        } catch(err) {
            setBill({...bill, error: true});
        }
    }

    return (
        <Container>
            {bill.error && <h1>There was an error!!</h1>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Select
                        label="Contact"
                        options={contacts}
                        onChange={handleChange}
                        name="ContactId"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Date</label>
                        <input type="date" name="date" value={bill.date} onChange={handleDate} id="date" />
                    </Form.Field>
                    <Form.Field>
                        <label>Due Date</label>
                        <input type="date" name="dueDate" value={bill.dueDate} onChange={handleDate} id="dueDate" />
                    </Form.Field>
                    <Form.Input
                        label="Invoice Number"
                        onChange={handleChange}
                        name="invoiceNumber"
                        value={bill.invoiceNumber}
                    />
                </Form.Group>

                {rows.map((value, i) => {
                    return (
                        <Form.Group key={i}>
                            <Form.TextArea
                                label="Description"
                                onChange={handleAccounts}
                                name={`description${i}`}
                            />
                            <Form.Input
                                label="Amount"
                                placeholder="Please enter a number"
                                onChange={handleAccounts}
                                name={`amount${i}`}
                            />
                            <Form.Select
                                label="Account"
                                options={accounts}
                                name={`AccountId${i}`}
                                onChange={handleAccounts}
                            />
                        </Form.Group>
                    )
                })}                
                <Button type="button" onClick={addRow}>Add Row</Button>

                <Button type="submit">Create Bill</Button>
            </Form>
        </Container>
    )
}



