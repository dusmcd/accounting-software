const app = require('./app');
const { db } = require('./db');

const port = process.env.PORT || 8080;

db.sync()
.then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
})