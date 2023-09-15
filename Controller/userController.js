const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const getUser = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);
  res.status(200).json({ id: _id, username: username, email: email });
});

const createUser = asyncHandler(async (req, res) => {
  const { username, lastname, email, password } = req.body;
  if (!username || !lastname || !email || !password) {
    res.status(200);
    throw new Error("Please Add All Fields");
  }
  //check user existed
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(200);
    throw new Error("User is alrady created");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    lastname,
    email,
    password: hashedPassword,
  });
  //show the created user
  if (user) {
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      message: "Account is created successfully",
    });
  } else {
    res.status(400).json({ message: "Invalid User Data" });
  }
});

const validateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!email || !password) {
    res.status(200);
    throw new Error("Please Add All Fields");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email, 
      token: generateToken(user._id),
      message: "Welcome Back",
    });
  } else {
    res.status(200);
    throw new Error("Invalid User Credentials");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedUser });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.status(200).json({ id: req.params.id });
});

//JWT Token Creation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  validateUser,
};
