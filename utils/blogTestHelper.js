const lodash = require("lodash");
const Blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;
  if (blogs.length === 0) {
    total = 0;
  }
  if (blogs.length >= 1) {
    blogs.forEach((blog) => {
      total += blog.likes;
    });
  }
  return total;
};

const favouriteBlog = (blogs) => {
  let favourite = {};
  if (blogs.length === 0) {
    return favourite;
  }
  if (blogs.length >= 1) {
    blogs.forEach((blog) => {
      let favouriteBlog = blogs[0];
      if (blog.likes > blogs[0].likes) {
        favouriteBlog = blog;
      }
      favourite = favouriteBlog;
    });
  }
  return favourite;
};

const mostBlogs = (blogs) => {
  const topPoster = {};

  if (blogs.length === 0) {
    return {};
  }
  if (blogs.length >= 1) {
    const allBlogsByAuthor = lodash.map(blogs, "author");
    topPoster.author = lodash
      .chain(allBlogsByAuthor)
      .countBy()
      .entries()
      .maxBy(lodash.last)
      .head()
      .value();
    topPoster.blogs = lodash
      .chain(allBlogsByAuthor)
      .countBy()
      .entries()
      .maxBy(lodash.last)
      .nth(1)
      .value();
  }
  return topPoster;
};

const mostLikes = (blogs) => {
  let topAuthor = {};

  if (blogs.length === 0) {
    return {};
  }
  if (blogs.length >= 1) {
    const totalLikesByAuthor = lodash(blogs)
      .groupBy("author")
      .map((objs, key) => ({
        author: key,
        likes: lodash.sumBy(objs, "likes"),
      }))
      .value();
    topAuthor = totalLikesByAuthor.reduce((max, author) =>
      max.likes > author.likes ? max : author
    );
  }
  return topAuthor;
};

const initialBlogs = [
  {
    title: "abc",
    author: "a",
    url: "url1",
    likes: "3",
  },
  {
    title: "asd",
    author: "b",
    url: "url2",
    likes: "2",
  },
  {
    title: "dsf",
    author: "c",
    url: "url3",
    likes: "6",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((note) => note.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs,
  blogsInDb,
};
