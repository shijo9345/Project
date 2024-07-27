const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
      phone,
    });

    const token = jwt.sign({ user: email }, 'Expense');

    res.json({ msg: 'Registered', user: newUser, token });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: 'User ID parameter is required' });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...userData } = user.dataValues;

    const { name, email, phone } = userData;

    res.json({ user: { name, email, phone } });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).send('Internal Server Error');
  }
};


exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password, phone } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.phone = phone || user.phone;

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Internal Server Error');
  }
}


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ user: email }, 'Expense');

    res.status(200).json({ token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Internal Server Error');
  }
};
