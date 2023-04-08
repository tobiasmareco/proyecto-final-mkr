import moongose from 'mongoose'

const userSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: String,
  premium: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
})

export const User = moongose.model('Users', userSchema);