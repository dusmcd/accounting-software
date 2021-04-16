const db = require('../db');
const {DataTypes} = require('sequelize');

const Bill = db.define('Bill', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Bill;