const User = require('..models/User');

module.exports = function create(req, res) {
    console.log('Contorller create() : ', req)
    // validating request
    if (!req.body.content) {
        return res.status(400)
            .send({
                message: "Content is not valid"
            })
    }
    // create a new user
    const user = new User({
        name: req.body.name || "Pushpinder",
        address: req.body.address
    });
    // save created user
    user.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};