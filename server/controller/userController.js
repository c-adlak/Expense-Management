const User = require("../models/User");

const saveUser = async (req, res) => {
  try {
    let { name, city, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Enter your name" });
    }
    if (!city) {
      return res.status(400).json({ message: "Enter your city" });
    }
    if (!email) {
      return res.status(400).json({ message: "Enter your email" });
    }
    if (!password) {
      return res.status(400).json({ message: "Enter your password" });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send("User saved successfully");
  } catch (error) {
    res.status(400).send("Error saving user: " + error.message);
  }
};
const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Enter your email" });
    }
    if (!password) {
      return res.status(400).json({ message: "Enter your password" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
module.exports = {
  saveUser,
  userLogin,
};
