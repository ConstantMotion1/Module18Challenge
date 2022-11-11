const { User } = require('../models');

module.exports = {
// /api/users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('thoughts')
          .populate('friends')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      },
    updateUser(req, res) {
    Course.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((course) =>
        !course
            ? res.status(404).json({ message: 'No course with this id!' })
            : res.json(course)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        Course.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : User.deleteMany( {_id: { $in: user.thoughts }})
          )
          .then(() => res.json({ message: 'Course and students deleted!' }))
          .catch((err) => res.status(500).json(err));

    },
};

