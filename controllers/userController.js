const fs = require('fs');
const User = require('../models/user');

exports.modifyUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, profile_image } = req.body;

    // Check if a file was uploaded
    if (req.file) {
      // Save the file name to the user profile
      const user = await User.findByIdAndUpdate(userId, { name, profile_image: req.file.filename }, { new: true });

      // Remove the previous profile image if it exists
      if (user.profile_image) {
        fs.unlinkSync(`uploads/profile_images/${user.profile_image}`);
      }

      return res.json({ message: 'User details and profile image modified successfully' });
    }

    // If no file was uploaded, update user details without modifying the profile image
    await User.findByIdAndUpdate(userId, { name });

    res.json({ message: 'User details modified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete user account if the user is authorized
    await User.findByIdAndDelete(userId);

    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.viewAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.modifyUserDetailsByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, profile_image } = req.body;

    // Check if a file was uploaded
    if (req.file) {
      // Save the file name to the user profile
      const user = await User.findByIdAndUpdate(userId, { name, profile_image: req.file.filename }, { new: true });

      // Remove the previous profile image if it exists
      if (user.profile_image) {
        fs.unlinkSync(`uploads/profile_images/${user.profile_image}`);
      }

      return res.json({ message: 'User details and profile image modified by admin successfully' });
    }

    // If no file was uploaded, update user details without modifying the profile image
    await User.findByIdAndUpdate(userId, { name });

    res.json({ message: 'User details modified by admin successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete user account by admin
    await User.findByIdAndDelete(userId);

    res.json({ message: 'User account deleted by admin successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
