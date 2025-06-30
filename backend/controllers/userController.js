const Users = require('../models/user');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'youraccesstokensecret';
const ACCESS_TOKEN_EXPIRES_IN = '15m';

// User Signup
exports.signUp = async (req, res) => {
  try {
    // If already signed in, do not proceed
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        jwt.verify(token, ACCESS_TOKEN_SECRET);
        return res.status(400).json({ message: 'Already signed in' });
      } catch (err) {
        return res.status(401).json({message:'Something is wrong'})
      }
    }
    validateSignUpData(req);
    const { name, email, password, companyName } = req.body;
    const role = 2; 
    const existingAdmin = await Users.findUserByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
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
    // If already signed in, do not proceed
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        jwt.verify(token, ACCESS_TOKEN_SECRET);
        return res.status(400).json({ message: 'Already signed in' });
      } catch (err) {}
    }
    const { email, password } = req.body;
    const user = await Users.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate access token only
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      user
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Get User Details (after login)
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user && req.user.id; // Get user ID from token
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required in token' });
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

