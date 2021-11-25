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

app.listen(process.env.PORT, () => {
    console.log('Server is running.');
});
