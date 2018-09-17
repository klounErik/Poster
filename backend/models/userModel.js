const mongoose = require('mongoose')
const Schema = mongoose.Schema

//TODO: Mer detaljerte modeller
const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'First Name is required'],
  },
  lastname: {
    type: String,
    required: [true, 'First Name is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
})

const Users = mongoose.model('users', userSchema)

module.exports = Users
