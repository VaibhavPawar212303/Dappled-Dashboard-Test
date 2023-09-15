const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
  const blogContent = req.body.blogContent;
  if (!blogContent) {
    res.status(400);
    throw new Error("Please provide blog data");
  } else {
    const blog = await Blog.create({
      heading: req.body.heading,
      describtion: req.body.describtion,
      blogContent: req.body.blogContent,
    });
    res.status(200).json({ blog });
  }
});

const getBlogPost = asyncHandler(async (req, res) => {
  const BlogPost = await Blog.findById(req.params.id);
  if (!BlogPost) {
    res.status(400);
    throw new Error("Blog Not Found");
  } else {
    res.status(200).json({ BlogPost });
  }
});

const getAllBlogPost = async (req, res) => {
  const allBlogPost = await Blog.find();
  res.status(200).json({ allBlogPost });
};

module.exports = { createBlog, getBlogPost, getAllBlogPost };
