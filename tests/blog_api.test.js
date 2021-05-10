const Blog = require('../models/blog');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.intitialBlogs);
});

describe('retrieving a blog', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs have a field named id', async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs[0].id).toBeDefined();
  });
});

describe('adding a blog', () => {
  test('adding blog increases the total count', async () => {
    const newBlog = { title: 'title', author: 'author', url: 'https://www.hs.fi/tiede/art-2000007958297.html', likes: 123456789 };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtTheEnd = await helper.blogsInDb();
    expect(blogsAtTheEnd.length).toBe(helper.intitialBlogs.length + 1);
  });

  test('if likes are not specified their alue becomes zero', async () => {
    const newBlog = { title: 'title', author: 'author', url: 'https://www.hs.fi/tiede/art-2000007958297.html' };

    const resultNote = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(resultNote.body.likes).toBe(0);
  });

  test('if both title and url are unspecified response is error code 400', async () => {
    const newBlog = { author: 'author', likes: 123456789 };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('deleting a blog', () => {
  test('deleting a blog works', async () => {
    const initialBlogs = await helper.blogsInDb();
    const id = initialBlogs[1].id;

    await api.delete(`/api/blogs/${id}`).expect(204);

    const blogAfterDeletion = await Blog.findById(id);
    expect(blogAfterDeletion).toBeNull();
  });
});

describe('updating a blog', () => {
  test('updating likes work', async () => {
    const initialBlogs = await helper.blogsInDb();
    const alternatedBlog = { ...initialBlogs[1], likes: 200 };
    const id = alternatedBlog.id;

    await api
      .put(`/api/blogs/${id}`)
      .send(alternatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const updatedBlog = await Blog.findById(id);
    expect(updatedBlog.likes).toBe(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
