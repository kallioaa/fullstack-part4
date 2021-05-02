const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, item) => sum + item.likes, 0);

const favoriteBlog = (blogs) => _.maxBy(blogs, 'likes');

const mostBlogs = (blogs) => {
  const tally = _.reduce(
    blogs,
    (total, next) => {
      total[next.author] = (total[next.author] || 0) + 1;
      return total;
    },
    {}
  );
  const result = Object.keys(tally).reduce((prevMostBlogs, next) => (_.isEmpty(prevMostBlogs) || tally[next] > prevMostBlogs.blogs ? { author: next, blogs: tally[next] } : prevMostBlogs), {});
  return result;
};

const mostLikes = (blogs) => {
  const result = _(blogs)
    .groupBy('author')
    .reduce((prevMostLikes, next) => (_.isEmpty(prevMostLikes) || totalLikes(next) > prevMostLikes.likes ? { author: next[0].author, likes: totalLikes(next) } : prevMostLikes), {});
  return result;
};
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
