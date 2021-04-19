const db = require('../db');
const {DataTypes} = require('sequelize');

const Account = db.define('Account', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accountNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Account;

