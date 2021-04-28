const {Sequelize} = require('sequelize');

const dbUrl = process.env.NODE_ENV === 'test' ? 'postgres://localhost:5432/accounting-test' : process.env.DB_URL;
const db = new Sequelize(dbUrl, {logging: false});

db.authenticate()
    .then(() => console.log('DB Connection successfully established'))
    .catch(err => console.error('DB Connection failed', err));

module.exports = db;