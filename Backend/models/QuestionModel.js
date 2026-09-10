import { Schema, model } from 'mongoose'

//cyber threat scenario question
const questionSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['phishing', 'password', 'qr', 'scam'],
      trim: true
    },
    prompt: {
      type: String,
      required: [true, 'Prompt is required'],
      trim: true
    },
    options: {
      type: [String],
      required: [true, 'Options are required']
    },
    correctAnswerIndex: {
      type: Number,
      required: [true, 'Correct answer index is required'],
      min: [0, 'Correct answer index cannot be negative']
    },
    explanation: {
      type: String,
      default: '',
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    }
  },
  { timestamps: true, versionKey: false, strict: 'throw' }
)

export const questionModel = model('question', questionSchema)
