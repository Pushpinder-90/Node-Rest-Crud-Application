const mongoos = require('mongoose');

/**
 * Mongoose uses this option to automatically add two new fields - createdAt and updatedAt to the schema.
 * 
 * */

const user_schema = mongoos.Schema({
    enroll_id: Number,
    username: String,
    password: String,
    address: String
});


module.exports = mongoos.model('User', user_schema);