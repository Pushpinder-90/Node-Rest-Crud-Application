const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
const app = express()

// Settin Connection with Mongoose
mongoose.Promise = global.Promise
mongoose.connect(dbConfig.connection_String, {
    useNewUrlParser: true
}).then(() => {
    console.log('Succesfuly connected to Mongo')
}).catch(err => {
    console.log('Not connected to Database', err);
    process.exit();
});

/*
* Get the default connection
* Bind connection to error event (to get notification of connection errors)
*/
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// verify Root Welcome
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Node Application" })
});

app.route('/users').get(require('./app/routes/routes'))         // findAll
app.route('/users/:Id').get(require('./app/routes/routes'));    // findOne
app.route('/createUser').post(require('./app/routes/routes'))   // create new
app.route('/editUser/:Id').patch(require('./app/routes/routes'))    // update
app.route('/users/:Id').delete(require('./app/routes/routes')); // findByIdAndRemove

app.listen(3000, () => {
    console.log('Server is up & listening on Port 3000')
})