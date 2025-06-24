const Users = require('../models/user');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'youraccesstokensecret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'yourrefreshtokensecret';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';
let refreshTokens = [];

// User Signup
exports.signUp = async (req, res) => {
  try {
    validateSignUpData(req);
    const { name, email, password, companyName } = req.body;
    const role = 2; 
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
    const { email, password } = req.body;
    const user = await Users.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate tokens
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
    refreshTokens.push(refreshToken);
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Refresh Token
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Refresh token not found, login again' });
  }
  try {
    const user = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token' });
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

