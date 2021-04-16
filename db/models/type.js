const db = require('../db');
const {DataTypes} = require('sequelize');

const Type = db.define('Type', {
    accountType: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Type;