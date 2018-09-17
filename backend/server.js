const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/users')

app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())

//TODO: Sikkerhet og Error-handling
app.use('/api', require('./routes/register'))
app.use('/api', require('./routes/login'))
app.use('/api', require('./routes/logout'))
app.use('/api', require('./routes/posts'))
app.use('/api', require('./routes/users'))

app.listen(process.env.port || 1234, error => {
  if (error) {
    console.log(error)
  } else {
    console.log('Succsessfully connected to the server!')
  }
})
