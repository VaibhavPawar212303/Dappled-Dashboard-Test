var express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  validateUser,
} = require("../Controller/userController");
const {
  createBlog,
  getBlogPost,
  getAllBlogPost,
} = require("../Controller/blogController");
const { protect } = require("../middleware/authMiddleware");
var router = express.Router();

router.route("/").get(protect, getUser);
router.route("/createuser").post(createUser);
router.route("/validateuser").post(validateUser);
router.route("/updateuser/:id").put(updateUser);
router.route("/deleteuser/:id").delete(deleteUser);
router.route("/createblog").post(protect, createBlog);
router.route("/getblogspost/:id").get(protect, getBlogPost);
router.route("/getallblogspost").get(getAllBlogPost);

module.exports = router;
