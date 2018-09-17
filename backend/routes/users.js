const express = require('express')
const router = express.Router()
const Users = require('../models/userModel')

router.get('/users', (req, res) => {
  Users.find({}).then(function(users) {
    res.send(users)
  })
})

router.delete('/deleteuser/:id', (req, res) => {
  Users.findByIdAndRemove({_id: req.params.id}).then(function(user) {
    if (user != null) {
      res.send(user)
    } else {
      res.sendStatus(404)
    }
  })
})

router.post('/finduser', (req, res) => {
  const User = {
    email: req.body.email,
  }
  Users.findOne({email: User.email}).then(function(user) {
    if (user != null) {
      res.send(user)
    } else {
      res.sendStatus(404)
    }
  })
})
module.exports = router
