const { user } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nama, username, password } = req.body;
    const users = await user.create({ nama, username, password });
    res.json({ status: true, message: 'User registered successfully', users });
  } catch (error) {
    res.json({ status: false, message: error.message, error });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await user.findOne({ where: { username } });
    if (!users) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: users.user_id, }, 'mabbar', { expiresIn: '1h' });
    res.json({ status: true, message: 'Login successful', data : {
      token : token,
      nama : users.nama
    } });
  } catch (error) {
    res.json({ status : false, message: error.message, error });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const users = await user.findOne({ where: { username } });
    if (!users) throw new Error('User not found');

    // Implementasi pengiriman email/reset link bisa ditambahkan di sini
    res.json({ status: true, message: 'Password reset link sent (mock)' });
  } catch (error) {
    res.json({ status: false, message: error.message, error });
  }
};