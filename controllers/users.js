require('express-async-errors');
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0, id: 0 });
  response.json(users);
});

usersRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (!body.password || body.password.length < 3) {
    return next({ name: 'ValidationError', message: "Password must be defined and it's length must be over 2" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogs: [],
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
