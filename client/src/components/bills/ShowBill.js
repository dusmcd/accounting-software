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
                date: formatDate(data.date),
                dueDate: formatDate(data.dueDate),
                invoiceNumber: data.invoiceNumber,
                transactions: data.Accounts,
                Contact: data.Contact
            });
        }
        fetchBill();
    }, [match.params.id])
    const totalAmount = bill.transactions.length && -bill.transactions[bill.transactions.length - 1]['Billing Transactions'].amount;
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
                                <Table.Cell>${t['Billing Transactions'].amount}</Table.Cell>
                            </Table.Row>
                        )
                    }
                    return null;
                })}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <h3 style={{textAlign: 'right'}}>Total Amount: ${totalAmount} </h3>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Container>
    )
}

function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    return `${dateObj.getMonth()+1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
}