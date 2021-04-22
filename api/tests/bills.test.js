const { createTransactions } = require('../helpers');

describe('createTransactions function', () => {
    const transactionList = [
        { accountId: 1, description: 'Office supplies', amount: 50},
        { accountId: 2, description: '', amount: 25},
        { accountId: 3, description: '', amount: 10},
    ]
    test('adds billId to transaction object', () => {
        transactionList.forEach((t, i) => {
            expect(createTransactions(transactionList, 99999, 100)[i].BillId).toBe(100);
        })
    });

    test('adds Accounts Payable transaction object to list', () => {
        const apTransaction = {
            AccountId: 7,
            description: 'Invoice Number 9999',
            amount: -85,
            BillId: 100
        }
        expect(createTransactions(transactionList, 9999, 100)[3]).toEqual(apTransaction);
    })
});
