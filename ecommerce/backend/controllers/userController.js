const User = require('../models/User');

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ user });
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { firstName, lastName, email, phone, password } = req.body;
  if (firstName !== undefined) user.firstName = firstName;
  if (lastName !== undefined) user.lastName = lastName;
  if (email !== undefined) user.email = email;
  if (phone !== undefined) user.phone = phone;
  if (password) user.password = password;

  const updated = await user.save();
  res.json({ user: { _id: updated._id, firstName: updated.firstName, lastName: updated.lastName, email: updated.email, phone: updated.phone, addresses: updated.addresses, role: updated.role } });
};

const addAddress = async (req, res) => {
  const user = await User.findById(req.user._id);
  const address = { ...req.body, isDefault: !!req.body.isDefault };

  if (address.isDefault) {
    user.addresses = user.addresses.map((item) => ({ ...item.toObject?.() || item, isDefault: false }));
  }

  user.addresses.push(address);
  await user.save();
  res.status(201).json({ addresses: user.addresses });
};

module.exports = { getProfile, updateProfile, addAddress };
