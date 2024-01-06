const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  phone_number: { type: String, unique: true },
  name: String,
  profile_image: String,
  password: String,
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
