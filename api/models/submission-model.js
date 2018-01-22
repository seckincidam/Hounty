import mongoose from 'mongoose'

const SubmissionSchema = mongoose.Schema({
  content: String,
  parentQuestID: String,
  ownerID: String,
  ownerUsername: String,
  isWinner: Boolean,
  likes: Number,
  likedUsers: Array
});

export const Submission = mongoose.model('Submission', SubmissionSchema);
