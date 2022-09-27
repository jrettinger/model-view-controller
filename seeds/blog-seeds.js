const Blog = require("../model/blog");

const blogData = [
  {
    title: "Blog Post #1",
    content: "This is Blog Post #1",
    userId: 1,
  },
  {
    title: "Blog Post #2",
    content: "This is Blog Post #2",
    userId: 2,
  },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
