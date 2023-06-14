const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const username = await User.findOne(email);
    if (user)
      return res.status(500).json({ message: "This email already in use..." });

    if (password.length < 6)
      return res.status(500).json({ message: "Password is too short..." });

    const passwordHash = await bcrypt.hash(password, 12);

    if (!validateEmail(email))
      return res.status(500).json({ message: "not an email type..." });

    const newUser = await User.create({ ...req.body, password: passwordHash });

    const token = await jwt.sign(
      { id: newUser._id, idAdmin: newUser.isAdmin },
      "SECRET_KEY",
      { expiresIn, resIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true }).status(201).json({
      token,
      newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const username = await User.findOne(email);
    if (!user)
      return res.status(500).json({ message: "email is not correct..." });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(500).json({ message: "password is not correct..." });
    }

    const token = await jwt.sign(
      { id: newUser._id, idAdmin: User.isAdmin },
      "SECRET_KEY",
      { expiresIn, resIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true }).status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

function validateEmail(email) {
  // Regular expression to match a valid email address
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.*@.*)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Return true if the email address matches the regular expression
  return regex.test(email);
}


module.exports = {register,login}
