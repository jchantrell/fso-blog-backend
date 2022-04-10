const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const user = await User.findById('62528edeb811d347ff63bfbc')
    const blog = new Blog(request.body, user)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    const blog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
        { new: true })
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter
