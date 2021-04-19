const express = require('express');
const app = express();
const path = require('path');
const {db} = require('./db');

// common middleware
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method + ': ' + req.path);
    next();
});


// api routes
app.use('/api', require('./api'));

app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'client/build'));
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json(err.message);
});

const port = process.env.PORT || 8080;


db.sync() // adding a comment
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })