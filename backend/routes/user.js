const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); // user for validation
const bcrypt = require("bcryptjs"); //used for hashing and salting
const jwt = require("jsonwebtoken"); //used to create token
const fetchuserdata = require("../middleware/fetchuser");

const jwt_Secret = "Inotebook@suraj#isbest"; // signature of app

// creating a user using req.body. no need to Login  ROUTE - 1
router.post(
  "/createuser",
  // validation
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // checkpoint for validation : if validation is false returns this
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // checkpoint for user using same email id
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json(
            success,
            "Sorry....!!! One othr user exists with same email-id"
          );
      }

      const salt = await bcrypt.genSalt(10); // generation of salt
      const securedPass = await bcrypt.hash(req.body.password, salt); // creating hash

      // creating a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_Secret); // craeting token using jsonwebtoken
      success = true;
      res.json({
        success,
        done: "done You are logged in",
        authToken: authToken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(success, "Something Went Wrong");
    }
  }
);

// Logging in a user using req.body. no need to Login ROUTE - 2
router.post(
  "/login",
  // validator
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "password cannot be Null").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // checkpoint for validation : if validation is false returns this
    if (!errors.isEmpty) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // searching for user with email
      const user = await User.findOne({ email });
      // if user not found do this
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Enter valid Credentials to Log-in" });
      }
      // if user found do this
      const passCompare = await bcrypt.compare(password, user.password); // check for pasword
      // if password not matches
      if (!passCompare) {
        return res
          .status(400)
          .json({ success, error: "Enter Valid Credentials to Log-in" });
      }

      const loadData = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(loadData, jwt_Secret); // retrieving auth token
      success = true;
      res.json({
        success,
        done: "done You are logged in",
        authToken: authToken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success, error: "Something went wrong" });
    }
  }
);

// Getting user info ..... Login Needed
router.post("/getuser", fetchuserdata, async (req, res) => {
  try {
    const userid = req.user.id; // getting user
    const data = await User.findById(userid).select("-password"); // fetching user-info except password
    res.json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Someting went wrong" });
  }
});

module.exports = router; //exports routes
