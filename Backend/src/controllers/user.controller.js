const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// const generatingJwtToken = ()=>{

// }

const userRegistration = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(409).json({
      message: "User already exist",
    });
  }

  const RegisterUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res
    .status(200)
    .json({ message: "User Registered Successfully!", user: RegisterUser });
};

const getAllRegisteredUser = async (req, res) => {
  const allUsers = await User.find();
  if (!allUsers) {
    return res.status(400).json({ message: "users are not found!" });
  }

  console.log(allUsers);
  return res
    .status(200)
    .json({ message: "Users Fetched Successfully", user: allUsers });
};

const getOneUser = async (req, res) => {
  const oneUser = await User.findOne({ name: "kishor" });
  if (!oneUser) {
    return res.status(400).json({ message: "user not found" });
  }

  return res
    .status(200)
    .json({ message: "one user find successfully", user: oneUser });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  if (!id) {
    return res.status(400).json({ message: "User id Not Found" });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(401).json({ message: "Name is required" });
  }

  const updatedUser = await User.findByIdAndUpdate(
    id, // Which user?
    {
      name: name, // What to update?
    },
    {
      new: true, // Return updated document
    },
  );

  if (!updateUser) {
    return res.status(404).json({ message: "user not found" });
  }

  return res
    .status(200)
    .json({ message: "user updated successfully", user: updateUser });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params)
  if (!id) {
    return res.status(404).json({ message: "User id not found" });
  }

  const deletedUser = await User.findByIdAndDelete(id);

  return res
    .status(200)
    .json({ message: "User Deleted successfully!", user: deletedUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password is required!" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const hashedPassword = user.password;

  const correctPass = await bcrypt.compare(password, hashedPassword);
  if (!correctPass) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  return res.status(200).json({
    message: "User login successfully!",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = {
  userRegistration,
  getAllRegisteredUser,
  getOneUser,
  updateUser,
  deleteUser,
  login,
};
