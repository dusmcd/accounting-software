const {Account, Bill, Contact, Invoice, JournalEntry, Type, BillingTransactions, InvoiceTransactions, JournalTransactions} = require('./models');

module.exports = {db: require('./db'), Account, Bill, Contact, Invoice, JournalEntry, Type, BillingTransactions, InvoiceTransactions, JournalTransactions};