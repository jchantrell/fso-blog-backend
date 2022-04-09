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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}