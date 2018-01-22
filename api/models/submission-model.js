import mongoose from 'mongoose'

const SubmissionSchema = mongoose.Schema({
  text: String,
  ownerID: String,
  ownerUsername: String,
  startDate: Date,
  endDate: Date,
  points: Number,
  isCompleted: Boolean,
  winner: String,
  submissions: Array,
  rarity: String,
  reward: String,
  upvotedUsers: Array
});

export const Submission = mongoose.model('Submission', SubmissionSchema);
