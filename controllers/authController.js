const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const config = require('../config');

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, phone_number, name, profile_image, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone_number }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone number already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      phone_number,
      name,
      profile_image,
      password: hashedPassword,
      role: 'User',
    });

    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, phone_number, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { phone_number }] });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, config.secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.signupAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, phone_number, name, profile_image, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await User.findOne({ $and: [{ $or: [{ email }, { phone_number }] }, { role: 'Admin' }] });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email or phone number already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      email,
      phone_number,
      name,
      profile_image,
      password: hashedPassword,
      role: 'Admin',
      isAdmin: true,
    });

    await admin.save();

    res.json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
