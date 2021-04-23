function createTransactions(transactionList, invoiceNumber, billId) {
    const totalAmount = transactionList.reduce((sum, t) => sum + t.amount, 0);

    // adding bill id to each transaction and then incuding entry to A/P account
    const updatedList = transactionList.map(t => ({...t, BillId: billId}));

    updatedList.push({
        AccountId: 7, // Accounts Payable id number 
        BillId: billId,
        amount: -totalAmount,
        description: `Invoice Number ${invoiceNumber}`
    });
    return updatedList;

}

function formatTransactions(transactions) {
    const result = [];
    Object.keys(transactions).forEach(key => {
        const resultIndex = key[key.length - 1];
        const property = key.slice(0, key.length - 1);
        result[resultIndex] = {...result[resultIndex],[property]: transactions[key] };
    })
    return result;
}

module.exports = { createTransactions, formatTransactions };