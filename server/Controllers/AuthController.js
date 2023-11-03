const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const  createSecretToken = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// @desc Signup user/set token
// route  POST /api/user/login
// @access Public

const Login = asyncHandler(async (req, res) => {
  

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    createSecretToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    
  } else {
    res.status(400);
    throw new Error("Invalid Email or password");
  }
});

// @desc Signup user/set token
// route  POST /api/user/register
// @access Public

const Signup = asyncHandler(async (req, res, next) => {
  
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    createSecretToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc Logout user
// route  POST /api/user/logout
// @access Public
const Logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: false,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

// @desc get user profile
// route  GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name : req.user.name,
    email : req.user.email
  }  
  res.status(200).json(user);
});

// @desc update user profile
// route  PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password){
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id:updatedUser._id,
      name : updatedUser.name,
      email: updatedUser.email
    }); 
  }
});

module.exports = { Signup, Login, Logout, getUserProfile, updateUserProfile };
