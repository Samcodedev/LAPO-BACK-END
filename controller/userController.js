const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); 
const asyncHandler = require("express-async-handler");
const { findUserByEmail, findUserByUserName } = require("../models/modelsController/userModelController");
const generateToken = require("../logic/generateToken");

// Register User
const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { username, email, password, fullName } = req.body;

        if (await findUserByEmail(email)) {
          res.status(400);
          next(new Error("Email already exists"));
        }

        if (await findUserByUserName(username)) {
          res.status(400);
          next(new Error("Username already exists"));
        }

        const newUser = new User({
            username,
            email,
            password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
            fullName
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (err) {
      res.status(500)
      next(new Error(err.message))
    }
});

// Login User
const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
          res.status(400);
          next(new Error("Invalid credentials"));
        }

        if (!await bcrypt.compare(password, user.password)) {
          res.status(400);
          next(new Error("Invalid credentials"));
        }

        res.json({
            status: 'success',
            data: {
                token: await generateToken({ id: user._id }, '15d'),
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    fullName: user.fullName
                }
            }
        });

    } catch (err) {
      res.status(500)
      next(new Error(err.message))
    }
});

module.exports = { 
    registerUser, 
    loginUser
};

