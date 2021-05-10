const User = require('../models/user');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe('retrieving users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});
describe('Creating an user', () => {
  test('adding a valid user increases count', async () => {
    const initialLength = helper.initialUsers.length;

    const newUser = {
      username: 'username',
      name: 'name',
      password: 'password',
    };

    await api.post('/api/users').send(newUser).expect(201);

    const usersAfterAddition = await helper.usersInDb();
    expect(usersAfterAddition.length).toBe(initialLength + 1);
  });

  test('user is not added when password is too short', async () => {
    const initialLength = helper.initialUsers.length;

    const newUser = {
      username: 'username',
      name: 'name',
      password: 'pa',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const usersAfterAddition = await helper.usersInDb();
    expect(usersAfterAddition.length).toBe(initialLength);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
