import { Schema, model } from 'mongoose'

//completed game score filed to the leaderboard
const scoreSchema = new Schema(
  {
    playerName: {
      type: String,
      required: [true, 'Player name is required'],
      trim: true,
      minlength: [1, 'Player name is required'],
      maxlength: [30, 'Player name cannot exceed 30 characters']
    },
    totalScore: {
      type: Number,
      required: [true, 'Total score is required'],
      default: 0
    },
    categoryBreakdown: {
      type: Object,
      default: {}
    },
    badge: {
      type: String,
      default: '',
      trim: true
    }
  },
  { timestamps: true, versionKey: false, strict: 'throw' }
)

export const scoreModel = model('score', scoreSchema)
