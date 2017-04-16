const router = require('express').Router();
const User = require('../models/').User;

const getAllUsers = (request, response) => {
  User.findAll({
    order: [['id', 'ASC']]
  })
    .then(data => response.send(data))
    .catch(error => response.send(error))
}

const createNewUser = (request, response) => {
  User.create({
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    password: request.body.password
  })
    .then(() => response.send('User successfully created!'))
    .catch(error => response.send(error))
}

router.route('/')
  .get(getAllUsers);

router.route('/create')
  .post(createNewUser);

module.exports = router;
