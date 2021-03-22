require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const adminCtrl = require('./controllers/adminCtrl');

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());

app.get('/api/admin/users', adminCtrl.getUsers);
app.put('/api/admin/users/:userId', adminCtrl.editUser);

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
.then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(SERVER_PORT, () => console.log(`Server up on ${SERVER_PORT}`));
})
.catch(err => console.log(err));