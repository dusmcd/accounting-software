const db = require('../db');
const {DataTypes} = require('sequelize');

const JournalEntry = db.define('Journal Entry', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = JournalEntry;