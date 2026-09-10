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
      min: [0, 'Total score cannot be negative'],
      max: [1000, 'Total score cannot exceed 1000'],
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
    },
    //optional link to a registered operative — null for guest play.
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: false,
      default: null
    }
  },
  { timestamps: true, versionKey: false, strict: 'throw' }
)

scoreSchema.index({ totalScore: -1 })
scoreSchema.index({ userId: 1, totalScore: -1 })

export const scoreModel = model('score', scoreSchema)
