const Admin = require('../models/admin');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');


//There will be only one Admin and one SignUp
exports.signUp = async (req, res) => {
  try {
    validateSignUpData(req);
    const { name, email, password, companyName } = req.body;
    const role = 1;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.createAdmin({ name, email, password: hashedPassword, role, companyName });
    res.status(201).json({ message: 'Admin created', admin });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin', error: err.message });
  }
}; 