const db = require('../db');
const {DataTypes} = require('sequelize');

const Contact = db.define('Contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING
});

module.exports = Contact;