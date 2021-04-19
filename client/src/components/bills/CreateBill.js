import React from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'semantic-ui-react';

class CreateBill extends React.Component {
    constructor() {
        super();
        this.state = {
            date: '',
            description: '',
            amount: 0
        }
    }
    handleDate = e => {
        this.setState({date: e.target.value})
    }
    handleChange = (e, { name, value }) => {
        this.setState({[name]: value});
    }
    handleSubmit = e => {
        // post state to database
        e.preventDefault();
        console.log('Data from form:', this.state);
    }

    render() {
        const accounts = [ // this will come from the DB . . . just a placeholder for now
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
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Select
                            label="Contact"
                            options={contacts}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <label>Date</label>
                            <input type="date" name="date" value={this.state.date} onChange={this.handleDate} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.TextArea
                            label="Description"
                            onChange={this.handleChange}
                            name="description"
                        />
                        <Form.Input
                            label="Amount"
                            placeholder="Please enter a number"
                            value={this.state.amount}
                            onChange={this.handleChange}
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
}

export default CreateBill;