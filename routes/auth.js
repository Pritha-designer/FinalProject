const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key_here';

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role, mobileNo, address } = req.body;

  if (!name || !email || !password || !mobileNo || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobileNo,
      address,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Sign up failed. Please try again.' });
  }
});
//login
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || user.role !== role) {
        return res.status(400).json({ message: 'Invalid email or role' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.json({ token, role: user.role ,
  user: {
    id: user._id,
    name: user.name,
    mobileNo: user.mobileNo,
    address: user.address
  }});
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
 
module.exports = router;
