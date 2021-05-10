const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    return next({ name: 'Unauthorized', message: 'Your session is not providing a valid token.' });
  }

  if (!body.title && !body.url) {
    return response.status(400).json({ error: 'You have to specify title or url' });
  }

  const blog = new Blog({ title: body.title, author: body.author, url: body.url, likes: body.likes || 0, user: user._id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const blogId = request.params.id;
  const user = request.user;

  if (!user) {
    return next({ name: 'Unauthorized', message: 'Your session is not providing a valid token.' });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (blog.user.toString() !== user._id.toString()) {
      return next({ name: 'Unauthorized', message: 'You do not have permission to delete this instance.' });
    }
    await Blog.findByIdAndDelete(blogId);
    return response.status(204).end();
  } catch (expection) {
    return response.status(400).json({ error: expection });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const newBody = request.body;
  try {
    const updatedPerson = await Blog.findByIdAndUpdate(id, newBody);
    response.json(updatedPerson);
  } catch (exception) {
    response.status(400).json({ error: expection });
  }
});

module.exports = blogsRouter;
