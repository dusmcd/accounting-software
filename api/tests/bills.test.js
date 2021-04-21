const { createTransactions } = require('../helpers');

describe('createTransactions function', () => {
    test('adds billId to transaction object', () => {
        expect(createTransactions(transactionList, 99999, 100)[0].billId).toBe(100);
    });

    test('adds Accounts Payable transaction object to list', () => {
        expect(createTransactions(transactionList, 9999, 100)[2]).toBe({});
    })
});
