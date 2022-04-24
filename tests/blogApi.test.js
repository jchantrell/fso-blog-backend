const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("../utils/blogTestHelper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
let token = "";

beforeEach(async () => {
  let testUser = await api
    .post("/api/login")
    .send({ username: "5char", password: "random" });
  token = testUser._body.token;
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is returned within returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const title = response.body.map((r) => r.title);
  expect(title).toContain("dsf");
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "aaad",
    author: "d",
    url: "url4",
    likes: "16",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const title = blogsAtEnd.map((n) => n.title);

  expect(title).toContain("aaad");
});

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

  expect(resultBlog.body).toEqual(processedBlogToView);
});

test("id is the proper json format", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultBlog.body.id).toBeDefined();
});

test("if likes on a blog post request is empty, it defaults to zero", async () => {
  const blog = {
    title: "nolikes",
    author: "dsfd",
    url: "url45",
  };

  const request = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(blog)
    .expect(200);

  expect(request.body.likes).toBeDefined(),
    expect(request.body.likes).toEqual(0);
});

test("if title is missing from post request, it returns bad request", async () => {
  const blog = {
    author: "dsfd",
    url: "url45",
  };

  const request = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(blog)
    .expect(400);

  expect(request.status).toEqual(400);
});

test("if url is missing from post request, it returns bad request", async () => {
  const blog = {
    title: "dsfd",
    author: "123",
  };

  const request = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(blog)
    .expect(400);

  expect(request.status).toEqual(400);
});

test("a blog can be deleted", async () => {
  const blog = {
    title: "initial",
    author: "initial",
    url: "initial",
    likes: 5,
  };

  const blogToDelete = await api
    .post("/api/blogs")
    .send(blog)
    .set("Authorization", `bearer ${token}`)
    .expect(200);

  const blogsAtStart = await helper.blogsInDb();

  await api
    .delete(`/api/blogs/${blogToDelete._body.id}`)
    .set("Authorization", `bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

  const blogs = blogsAtEnd.map((r) => r.id);

  expect(blogs).not.toContain(blogToDelete.id);
});

test("a blog can be updated", async () => {
  const blog = {
    title: "initial",
    author: "initial",
    url: "initial",
    likes: 5,
  };
  const updateLikes = {
    likes: 7,
  };

  const initialBlog = await api
    .post("/api/blogs")
    .send(blog)
    .set("Authorization", `bearer ${token}`)
    .expect(200);

  const updatedBlog = await api
    .put(`/api/blogs/${initialBlog.body.id}`)
    .send(updateLikes)
    .set("Authorization", `bearer ${token}`)
    .expect(200);

  expect(updatedBlog.body.likes).toEqual(7);
});

afterAll(() => {
  mongoose.connection.close();
});
