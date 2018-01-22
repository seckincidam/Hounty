import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: String,
  passwordResetToken: String,
  createdAt: Date,
  lastLogin: Date,
  points: Number,
  role: String,
  chanceMultiplier: Number
});

export const User = mongoose.model('User', UserSchema);
