const Users = require('../models/user');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');

// User Signup
exports.signUp = async (req, res) => {
  try {
    validateSignUpData(req);
    const { name, email, password, companyName } = req.body;
    const role = 2; // Assuming 2 is for regular users
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.createUsers({ name, email, password: hashedPassword, role, companyName });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    console.log("insidee")
    const { email, password } = req.body;
    const user = await Users.findUserByEmail(email);
    if (!user) {
        console.log(user)
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(password,user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Get User Details (after login)
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.query.id; // e.g., /api/user/details?id=123
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await Users.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user details', error: err.message });
  }
};

