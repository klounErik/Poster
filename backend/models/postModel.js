const mongoose = require('mongoose')
const Schema = mongoose.Schema

//TODO: Mer detaljerte modeller
const postSchema = new Schema({
  username: {
    type: String,
    required: [true, 'A post must have an username'],
  },
  title: {
    type: String,
    required: [true, 'A post must have an title'],
  },
  content: {
    type: String,
    required: [true, 'A post can not be empty'],
  },
  timestamp: {
    type: String,
    required: [true, 'A post must have a timestamp'],
  },
})

const Posts = mongoose.model('posts', postSchema)

module.exports = Posts
