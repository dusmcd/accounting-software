const Account = require('./account');
const Bill = require('./bill');
const Contact = require('./contact');
const Invoice = require('./invoice');
const JournalEntry = require('./journalEntry');
const Type = require('./type');
const db = require('../db');
const { DataTypes } = require('sequelize');


// define associations here
Type.hasMany(Account);
Account.belongsTo(Type);

Contact.hasMany(Bill);
Bill.belongsTo(Contact);

Contact.hasMany(Invoice);
Invoice.belongsTo(Contact);

const BillingTransactions = db.define('Billing Transactions', {
    BillId: {
        type: DataTypes.INTEGER,
        references: {
            model: Bill,
            key: 'id'
        }
    },
    AccountId: {
        type: DataTypes.INTEGER,
        references: {
            model: Account,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
});
Bill.belongsToMany(Account, {through: BillingTransactions});
Account.belongsToMany(Bill, {through: BillingTransactions});

const InvoiceTransactions = db.define('Invoice Transactions', {
    InvoiceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Invoice,
            key: 'id'
        }
    },
    AccountId: {
        type: DataTypes.INTEGER,
        references: {
            model: Account,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: DataTypes.STRING
});
Invoice.belongsToMany(Account, {through: InvoiceTransactions});
Account.belongsToMany(Invoice, {through: InvoiceTransactions});

const JournalTransactions = db.define('Journal Transactions', {
    JournalId: {
        type: DataTypes.INTEGER,
        references: {
            model: JournalEntry,
            key: 'id'
        }
    },
    AccountId: {
        type: DataTypes.INTEGER,
        references: {
            model: Account,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: DataTypes.STRING
});
JournalEntry.belongsToMany(Account, {through: JournalTransactions});
Account.belongsToMany(JournalEntry, {through: JournalTransactions});

module.exports = {
    Account,
    Bill,
    Contact,
    Invoice,
    JournalEntry,
    Type,
    BillingTransactions,
    InvoiceTransactions,
    JournalTransactions
};