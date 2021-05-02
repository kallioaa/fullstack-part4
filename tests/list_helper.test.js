const dummy = require('../utils/list_helper').dummy;
const totalLikes = require('../utils/list_helper').totalLikes;
const favoriteBlog = require('../utils/list_helper').favoriteBlog;
const mostBlogs = require('../utils/list_helper').mostBlogs;
const mostLikes = require('../utils/list_helper').mostLikes;

// arrays of blogs used in testing
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('dummy return one', () => {
  const blogsEmpty = [];
  const results = dummy(blogsEmpty);
  expect(results).toBe(1);
});

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('list with multiple blogs has the correct number of likes', () => {
    const result = totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('function returns the only blog in a list', () => {
    const result = favoriteBlog(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0]);
  });

  test('function returns the correct blog from multiple', () => {
    const result = favoriteBlog(blogs);
    expect(result).toBe(blogs[2]);
  });
});

describe('most blogs', () => {
  test('function returns the only blogger in a list', () => {
    const result = mostBlogs(listWithOneBlog);
    expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });

  test('function returns the author with most blogs from multiple', () => {
    const result = mostBlogs(blogs);
    expect(result).toStrictEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('most likes', () => {
  test('function returns the only blogger in a list', () => {
    const result = mostLikes(listWithOneBlog);
    expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('function returns the author with most blogs from multiple', () => {
    const result = mostLikes(blogs);
    expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
