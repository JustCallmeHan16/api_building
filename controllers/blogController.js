const { default: mongoose } = require("mongoose");
const Blog = require("../database/models/blogModel");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ creatAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;

  //* when u use the middleware just return the fun if u don't u will get error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }

  const blog = await Blog.findById({ _id: id });

  if (!blog) {
    return res.status(404).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

const createBlog = async (req, res) => {
  const { title, body } = req.body;
  const blogBox = [];

  if (!title) {
    blogBox.push("title");
  }

  if (!body) {
    blogBox.push("body");
  }

  if (blogBox.length > 0) {
    return res.status(404).json({ error: "All fields must be fill", blogBox });
  }

  try {
    const blog = await Blog.create({ title, body });
    res.status(201).json(blog);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteBlogById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }

  const blog = await Blog.findByIdAndDelete({ _id: id });

  if (!blog) {
    return res.status(404).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }

  const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!blog) {
    return res.status(404).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
  updateBlog,
};
