const { createTransactions, formatTransactions } = require('../helpers');

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

describe('formatTransactions function', () => {
    const transactions = {description0: 'something', amount0: -50, AccountId0: 1, amount1: 10, AccountId1: 2};

    test('changes given transaction object to an array', () => {
        expect(Array.isArray(formatTransactions(transactions))).toBeTruthy();
    });

    test('outputs array in specified format based on given object keys', () => {
        const expectedArray = [{
            description: 'something',
            amount: 50,
            AccountId: 1
        }, {
            amount: 10,
            AccountId: 2
        }]
        expect(formatTransactions(transactions)).toEqual(expectedArray);
    });

    test('casts amount property to a Number type', () => {
        expect(typeof formatTransactions(transactions)[0].amount).toBe('string')
    });
})