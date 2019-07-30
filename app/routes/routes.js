// create a new express router
const express = require('express');
router = express.Router();
userController = require('../controllers/user.controller.js');

module.exports = router;

// create a new User
router.post('/createUser', userController.user_create);

// update a user with id
router.patch('/editUser/:id', userController.user_update);

// get all the Users
router.get('/users', userController.findAll);

// Retrieve a single User with id
router.get('/users/:id', userController.findOne);

// Delete a user by id
router.delete('/users/:id', userController.delete_user);