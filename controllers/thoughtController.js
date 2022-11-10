const { Thought, User } = require('../models');

module.exports = {
// /api/users
    getUsers(req, res) {
        User.find()
    }
}