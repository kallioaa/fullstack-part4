const Blog = require('../models/blog');
const User = require('../models/user');

const intitialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
];

const initialUsers = [
  {
    username: 'miramaapahkina',
    name: 'Mira Maapähkinä',
    password: 'pähkinämaa',
  },
  {
    username: 'timotammenterho',
    name: 'Timo Tammenterho',
    password: 'Tammenterhotarha',
  },
  {
    username: 'johannajuusto',
    name: 'Johanna Juusto',
    password: 'Juustolaada',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { intitialBlogs, blogsInDb, initialUsers, usersInDb };
