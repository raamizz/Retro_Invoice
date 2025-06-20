const Admin = require('../models/admin');

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;
    const role = 1;
    const admin = await Admin.createAdmin({ name, email, password, role, companyName });
    res.status(201).json({ message: 'Admin created', admin });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin', error: err.message });
  }
}; 