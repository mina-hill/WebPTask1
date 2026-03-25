// User.js (AI Generated)
const mongoose = require('./db');
const bcrypt = require('bcrypt');

// Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }
});

const UserModel = mongoose.model('users', userSchema);

// User Class
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async register() {
    // Check if username already exists
    const existing = await UserModel.findOne({ username: this.username });
    if (existing) {
      return "Username already taken";
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(this.password, 10);
    const newUser = new UserModel({ username: this.username, password: hashedPassword });
    await newUser.save();
    return "User registered successfully";
  }

  async login() {
    // Find user by username only
    const user = await UserModel.findOne({ username: this.username });
    if (!user) return null;

    // Compare entered password with hashed password
    const match = await bcrypt.compare(this.password, user.password);
    return match ? user : null;
  }
}

module.exports = User;
