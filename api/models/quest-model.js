import mongoose from 'mongoose'

const QuestSchema = mongoose.Schema({
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

export const Quest = mongoose.model('Quest', QuestSchema);
