import { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';

export default function CreateAccount() {
    const [account, setAccount] = useState({
        name: '',
        accountNumber: 0
    });

    const [types, setTypes] = useState([]);

    useEffect(() => {
        async function fetchTypes() {
            const res = await axios.get('/api/accounts?getDetail=false')
            const typeList = await res.data;
            setTypes(typeList.map(type => {
                return {value: type.id, text: type.accountType, key: type.id}
            }));
        }

        fetchTypes();
    }, []);

    function handleChange(e, { name, value}) {
        setAccount({...account, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit called!');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Input
                    name="name"
                    placeholder="Account Name"
                    value={account.name}
                    onChange={handleChange}
                    label="Account Name"
                />
            </Form.Group>
            <Form.Group>
                <Form.Select
                    options={types}
                    placeholder="Select Account Type"
                    label="Account Type"
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    name="accountNumber"
                    label="Account Number"
                    placeholder="Account Number"
                    onChange={handleChange}
                />
            </Form.Group>

            <Button type="submit">Create Account</Button>
        </Form>
    )
}