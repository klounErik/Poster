const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Users = require('../models/userModel')

router.post('/createuser', (req, res) => {
  const User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  }
  Users.findOne({email: User.email}).then(function(result) {
    if (result === null) {
      Users.create(User).then(function(user) {
        res.send(user)
      })
    } else {
      res.sendStatus(304)
    }
  })
})

router.put('/edituser/:id', (req, res) => {
  Users.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
    Users.findOne({_id: req.params.id}).then(function(user) {
      if (user != null) {
        res.send(user)
      } else {
        res.sendStatus(404)
      }
    })
  })
})

module.exports = router
