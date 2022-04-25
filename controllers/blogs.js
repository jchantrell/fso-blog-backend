const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const userExtractor = require("../utils/middleware").userExtractor;

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("comments", {
      content: 1,
      likes: 1,
    })
    .populate("user", {
      username: 1,
      name: 1,
    });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("comments", {
    content: 1,
    likes: 1,
  });

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/:id/comments", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  const blog = await Blog.findById(body.blogId);

  try {
    const comment = new Comment({
      content: body.content,
      likes: body.likes,
      user: user._id,
      blog: blog,
    });

    const savedComment = await comment.save();
    user.comments = user.comments.concat(savedComment._id);
    await user.save();
    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();

    response.json(savedComment);
  } catch (error) {
    console.log(error);
  }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog);
  } catch (error) {
    console.log(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else
      response.status(401).json({
        error: "object does not belong to current user",
      });
  } else {
    response.status(404).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true }
  );
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
