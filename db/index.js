const {Account, Bill, Contact, Invoice, JournalEntry, Type} = require('./models');

module.exports = {db: require('./db'), Account, Bill, Contact, Invoice, JournalEntry, Type};