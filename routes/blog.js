const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
  updateBlog,
} = require("../controllers/blogController");

router.get("/blog", getAllBlogs);

router.get("/blog/:id", getBlogById);

router.post("/blog", createBlog);

router.delete("/blog/:id", deleteBlogById);

router.patch("/blog/:id", updateBlog);

module.exports = router;
