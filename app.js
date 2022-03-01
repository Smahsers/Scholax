const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;