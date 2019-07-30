const User = require('../models/user');

// create and save a new user
exports.user_create = (req, res) => {
    // console.log('User Contorller Request id : ', req.body.id)
    // validating request
    if (req.body.content) {
        return res.status(400)
            .send({
                message: "Content is not valid"
            })
    }
    // create a new user
    const created_user = new User({
        enroll_id: req.body.enroll_id,
        username: req.body.username,
        password: req.body.password,
        address: req.body.address
    });
    // save created user
    created_user.save()
        .then(data => {
            console.log('created_user :', data._id)
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message + " Some error occurred while creating the User."
            });
        });
};

// updating a user
exports.user_update = (req, res) => {
    const id = req.params.id;
    const updateObject = req.body;
    console.log('req.body',req.body)
    User.update({ _id:id }, { $set:updateObject })
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'User is updated',
          updateUser: updateObject,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.'
        });
      });
  }


// Retreiving Single User with UserId
exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with " + req.params.id
                });
            }
            res.status(200).send(user)
        }).catch(err =>
            res.status(505)
                .send({
                    message: err.message
                }))
}

/** Delete user by ID */
exports.delete_user = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User is not found !!"
                })
            }
            res.status(200).send({
                message: user + "is Deleted Successfuly !!"
            });
        }
        )
        .catch(err => res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        })
        )
}


// Retreiving all users
exports.findAll = (req, res) => {
    User.find()
        .then(user => {
            // console.log("findAll : ", user)
            res.send(user)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong"
            })
        });

};