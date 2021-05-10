const logger = require('./logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const token = request.token;
    const decodedToken = jwt.verify(token, config.SECRET_KEY);
    const user = await User.findById(decodedToken.id);
    request.user = user;
  } catch (exception) {
    logger.error(exception);
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'Unauthorized') {
    return response.status(401).json({ error: error.message });
  }
  next(error);
};

module.exports = { tokenExtractor, userExtractor, errorHandler };
