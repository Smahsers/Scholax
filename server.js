const dotenv = require('dotenv');
const mongoose = require('mongoose');
const server = require('./app');

dotenv.config({path: './config.env'});
const PORT = process.env.PORT || 5000;

const DB_PASS = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL.replace('<password>', DB_PASS);

process.on('uncaughtException', () => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});


mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database sucessfully connected'));

server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
