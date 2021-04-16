const {Sequelize} = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/accounting', {logging: false});

db.authenticate()
    .then(() => console.log('DB Connection successfully established'))
    .catch(err => console.error('DB Connection failed', err));

module.exports = db;