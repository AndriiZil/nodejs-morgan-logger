//**** I Skipped some generated code in app.js (express.js)
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express()

// setup the logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
//create writestream for storing log

//if you want to skip some logs from your last result.
const option = { skip: function (req, res) { return res.statusCode < 400 }, stream: accessLogStream };

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', option));

app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.listen(3000);
