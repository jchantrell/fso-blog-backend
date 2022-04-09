const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'abc',
        author: 'a',
        url: 'url1',
        likes: '3'
    },
    {
        title: 'asd',
        author: 'b',
        url: 'url2',
        likes: '2'
    },
    {
        title: 'dsf',
        author: 'c',
        url: 'url3',
        likes: '6'
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

const blogDefaults = async (blog) => {
    const response = await Blog.post(blog)
    return response.data[0].likes
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, blogDefaults
}