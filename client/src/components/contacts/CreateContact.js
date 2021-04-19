import React from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import axios from 'axios';

class CreateContact extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            phoneNumber: '',
            email: '',
            error: false
        };
    }


    handleSubmit = async e => {
        e.preventDefault();
        // post to database
        try {
            const newContact = await axios.post('/api/contacts', this.state)
            console.log('contact created!');
        } catch(err) {
            this.setState({error: true});
        }

    }

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});
    }

    render() {
        return (
            <Container>
                {this.state.error && <h1>There was an error!</h1>}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input
                            name="name"
                            label="Name"
                            placeholder="Business or Individual Name"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="Phone Number"
                            onChange={this.handleChange}
                            value={this.state.phoneNumber}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            name="email"
                            label="Email Address"
                            placeholder="Email Address"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </Form.Group>
                    <Button type="submit">Create Contact</Button>
                </Form>
            </Container>
        )
    }
}

export default CreateContact;