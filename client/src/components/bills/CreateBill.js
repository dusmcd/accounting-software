import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'semantic-ui-react';



export default function CreateBill() {
    const [bill, setBill] = useState({
        date: '',
        dueDate: '',
        invoiceNumber: '',
        transactions: {},
        ContactId: 0,
    });

    const [accounts, setAccounts] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [rows, setRows] = useState([1]);


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
        setBill({...bill, transactions: {...bill.transactions, [name]: value}})
    }
    function handleSubmit(e) {
        // post state to database
        e.preventDefault();
        console.log('Data from form:', bill);
    }

    return (
        <Container>
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
                                // value={bill.transactions[`description${i}`]}
                            />
                            <Form.Input
                                label="Amount"
                                placeholder="Please enter a number"
                                // value={bill.transactions[`amount${i}`]}
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



