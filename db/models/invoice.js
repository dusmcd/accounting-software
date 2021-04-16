const db = require('../db');
const {DataTypes} = require('sequelize');

const Invoice = db.define('Invoice', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Invoice;