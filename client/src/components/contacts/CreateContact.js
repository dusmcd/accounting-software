import React, { useState } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function CreateContact() {

    const [contact, setContact] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        error: false
    });
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        // post to database
        try {
            const newContact = await axios.post('/api/contacts', contact);
            history.push('/');
        } catch(err) {
            setContact({...contact, error: true});
        }

    }

    function handleChange (e, {name, value}) {
        setContact({...contact, [name]: value});
    }

    return (
        <Container>
                {contact.error && <h1>There was an error!</h1>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Input
                            name="name"
                            label="Name"
                            placeholder="Business or Individual Name"
                            onChange={handleChange}
                            value={contact.name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            value={contact.phoneNumber}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            name="email"
                            label="Email Address"
                            placeholder="Email Address"
                            onChange={handleChange}
                            value={contact.email}
                        />
                    </Form.Group>
                    <Button type="submit">Create Contact</Button>
                </Form>
            </Container>
    )
}

