const express = require("express");
const verifyToken = require("../../middleware/verifyToken");
const Blog = require("../../models/blog");
const router = express.Router();

// get all blogs
router.get("/blogs", verifyToken, async (req, res) => {
  const blogStatus = req.query.status;
  let filter;
  if (blogStatus) {
    filter = { status: blogStatus };
  } else {
    filter = {};
  }
  const result = await Blog.find(filter);
  res.send(result);
});
//get published blogs
router.get("/blogs/published", async (req, res) => {
  const result = await Blog.find({ status: "published" });
  res.send(result);
});
// post a blog
router.post("/blogs/add-blog", async (req, res) => {
  const blog = req.body;
  const result = await Blog.create(blog);
  res.send(result);
});
// update blog status
router.patch("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.body;
  const data = {
    $set: status,
  };
  const filter = { _id: id };
  const result = await Blog.updateOne(filter, data);
  res.send(result);
});
// delete a blog
router.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  const result = await Blog.deleteOne(filter);
  res.send(result);
});

module.exports = router;
