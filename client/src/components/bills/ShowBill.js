import { useState, useEffect } from 'react';
import { Container, Table } from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios';

export default function ShowBill(props) {
    const [bill, setBill ] = useState({
        date: '',
        dueDate: '',
        invoiceNumber: '',
        Contact: {},
        transactions: []
    });

    const match = useRouteMatch();

    useEffect(() => {
        async function fetchBill() {
            const res = await axios.get(`/api/bills/${match.params.id}`);
            const data = await res.data;
            // get transactions and dates into a good format
            setBill({
                date: data.date,
                dueDate: data.dueDate,
                invoiceNumber: data.invoiceNumber,
                transactions: data.Accounts,
                Contact: data.Contact
            });
        }
        fetchBill();
    }, [match.params.id])

    return (
        <Container>
            <h2>{bill.Contact.name}</h2>
            <p>Date: {bill.date}</p>
            <p>Due Date: {bill.dueDate}</p>
            <p>Invoice Number: {bill.invoiceNumber}</p>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Account</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {!!bill.transactions && bill.transactions.map((t, i) => {
                    if (i !== bill.transactions.length - 1) {
                        return (
                            <Table.Row key={t.id}>
                                <Table.Cell>{t['Billing Transactions'].description}</Table.Cell>
                                <Table.Cell>{`${t.accountNumber} - ${t.name}`}</Table.Cell>
                                <Table.Cell>{t['Billing Transactions'].amount}</Table.Cell>
                            </Table.Row>
                        )
                    }
                })}
                </Table.Body>
            </Table>
        </Container>
    )
}