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

module.exports = { createTransactions };