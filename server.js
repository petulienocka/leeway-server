const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const closetRoute = require('./routes/closets');
const categoryRoute = require('./routes/categories');

dotenv.config();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

mongoose
    .connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/closets', closetRoute);
app.use('/api/categories', categoryRoute);

const port = process.env.PORT || 8080;

const server = app.listen(port, (error) => {
    if (error) {
        console.log('Error running Express');
    }
    console.log('Server is running on port', server.address().port);
});
