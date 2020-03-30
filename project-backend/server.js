const express = require('express');
const app = express();

const mongoose  = require('mongoose');

mongoose.connect("mongodb://localhost/programs", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));


app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

//Routes
const programRouter = require('./routes/programs');
app.use('/programs', programRouter);
//End of routes

app.listen(3001, () => console.log('server started'));