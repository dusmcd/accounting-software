const db = require('../db');
const {DataTypes} = require('sequelize');

const Account = db.define('Account', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Account;

