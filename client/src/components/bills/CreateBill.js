import React, { useState } from 'react';
// import axios from 'axios';
import { Form, Button, Container } from 'semantic-ui-react';

export default function CreateBill() {
    const [bill, setBill] = useState({
        date: '',
        dueDate: '',
        description: '',
        amount: 0,
        invoiceNumber: ''
    })

    function handleDate(e) {
        setBill({...bill, [e.target.name]: e.target.value});
    }
    function handleChange(e, { name, value }) {
        setBill({...bill, [name]: value});
    }
    function handleSubmit(e) {
        // post state to database
        e.preventDefault();
        console.log('Data from form:', bill);
    }

    // these will come from DB; just a placeholder for now
    const accounts = [
        {key: 1, text: 'Consulting', value: 'consulting'},
        {key: 2, text: 'Supplies', value: 'supplies'},
        {key: 3, text: 'Training', value: 'training'}
    ]
    const contacts = [
        {key: 1, text: 'Jim', value: 'Jim'},
        {key: 2, text: 'Bob', value: 'Bob'},
        {key: 3, text: 'Dave', value: 'Dave'},
    ]

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Select
                        label="Contact"
                        options={contacts}
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
                <Form.Group>
                    <Form.TextArea
                        label="Description"
                        onChange={handleChange}
                        name="description"
                    />
                    <Form.Input
                        label="Amount"
                        placeholder="Please enter a number"
                        value={bill.amount}
                        onChange={handleChange}
                        name="amount"
                    />
                    <Form.Select
                        label="Account"
                        options={accounts}
                    />
                </Form.Group>
                <Button type="submit">Create Bill</Button>
            </Form>
        </Container>
    )
}

