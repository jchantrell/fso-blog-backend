const helper = require("../utils/blogTestHelper");

test("dummy returns one", () => {
  const blogs = [];

  const result = helper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithZeroBlogs = [];
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];
  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has zero blogs return zero", () => {
    const result = helper.totalLikes(listWithZeroBlogs);
    expect(result).toBe(0);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const result = helper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("when list has multiple blogs, equals the likes of all", () => {
    const result = helper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(10);
  });
});

describe("favourite blog", () => {
  const blogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    },
  ];

  test("if blog has the most likes, it should be a favourite", () => {
    const result = helper.favouriteBlog(blogs);
    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f6",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    });
  });
});

describe("author who has the most blog entries", () => {
  const noBlogs = [];
  const multipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f0",
      title: "Go To Statement Considered Harmful",
      author: "Sally",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f1",
      title: "Go To Statement Considered Harmful",
      author: "Bob",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "Go To Statement Considered Harmful",
      author: "Sally",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f3",
      title: "Go To Statement Considered Harmful",
      author: "Tim",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    },
  ];
  test("if there are no blogs, there should be top poster", () => {
    const result = helper.mostBlogs(noBlogs);
    expect(result).toEqual({});
  });
  test("if author has the most blog entries, they should be the top poster", () => {
    const result = helper.mostBlogs(multipleBlogs);
    expect(result).toEqual({ author: "Sally", blogs: 2 });
  });
});

describe("author who has the most likes overall", () => {
  const noBlogs = [];
  const multipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f0",
      title: "Go To Statement Considered Harmful",
      author: "Sally",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f1",
      title: "Go To Statement Considered Harmful",
      author: "Bob",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "Go To Statement Considered Harmful",
      author: "Sally",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f3",
      title: "Go To Statement Considered Harmful",
      author: "Tim",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    },
  ];
  test("if there are no blogs, there should be no top author", () => {
    const result = helper.mostLikes(noBlogs);
    expect(result).toEqual({});
  });
  test("if author has the most likes overall, they should be returned", () => {
    const result = helper.mostLikes(multipleBlogs);
    expect(result).toEqual({ author: "Sally", likes: 13 });
  });
});
