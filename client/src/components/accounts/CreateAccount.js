import { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

export default function CreateAccount() {
    const [account, setAccount] = useState({
        name: '',
        accountNumber: 0,
        typeId: 0,
        error: false
    });
    const history = useHistory();
    const [types, setTypes] = useState([]);

    useEffect(() => {
        async function fetchTypes() {
            const res = await axios.get('/api/accounts/types?getDetails=false')
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

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            await axios.post('/api/accounts', account)
            history.push('/coa');
        } catch(err) {
            console.error(err);
            setAccount({...account, error: true});
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            {account.error && <h1>Error occurred!!</h1>}
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
                    onChange={handleChange}
                    name="typeId"
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