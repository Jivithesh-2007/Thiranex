const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerSchema, loginSchema } = require('../middleware/validation');

const tokenForUser = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const safeUser = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  addresses: user.addresses,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const register = async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400);
    throw new Error(parsed.error.issues[0]?.message || 'Invalid registration data');
  }

  const { firstName, lastName, email, password, phone } = parsed.data;
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('Email already registered');
  }

  const user = await User.create({ firstName, lastName, email, password, phone });
  const token = tokenForUser(user._id);
  setAuthCookie(res, token);

  res.status(201).json({ token, user: safeUser(user) });
};

const login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400);
    throw new Error(parsed.error.issues[0]?.message || 'Invalid login data');
  }

  const user = await User.findOne({ email: parsed.data.email }).select('+password');
  if (!user || !(await user.matchPassword(parsed.data.password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = tokenForUser(user._id);
  setAuthCookie(res, token);
  res.json({ token, user: safeUser(user) });
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

const profile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ user });
};

module.exports = { register, login, logout, profile, safeUser };
