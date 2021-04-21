function createTransactions(transactionList, invoiceNumber, billId) {
    const totalAmount = transactionList.reduce((sum, t) => sum + t.amount, 0);

    // adding bill id to each transaction and then incuding entry to A/P account
    return transactionList.map(t => ({...t, billId})).push({
        accountId: 20000, // Accounts Payable id number 
        billId: billId,
        amount: totalAmount,
        description: `Invoice Number ${invoiceNumber}`
    });

}

module.exports = { createTransactions };