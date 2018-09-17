const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Posts = require('../models/postModel')
const secret = require('../config')
const verifyToken = require('../auth')

router.get('/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, secret.secret, (err, authData) => {
    if(err){
      res.sendStatus(403)
    }else{
      Posts.find({}).then(function(posts) {
        res.send(posts)
      })
    }
  })
})

router.post('/submitpost', verifyToken, (req, res) => {
  jwt.verify(req.token, secret.secret, (err, authData) =>{
    if(err){
      console.log(err)
      res.sendStatus(403)
    }else{
      Posts.create(req.body).then(function(posts) {
        res.send(posts)
      })
    }
  })
})

     


router.put('/editpost/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, secret.secret, (err, authData) =>{
    if(err){
      console.log(err)
      res.sendStatus(403)
    }else{
      Posts.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
        Posts.findOne({_id: req.params.id}).then(function(posts) {
          if (posts != null) {
            res.send(posts)
          } else {
            res.sendStatus(404)
          }
        })
      })
    }
})
})

router.delete('/deletepost/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, secret.secret, (err, authData) =>{
    if(err){
      console.log(err)
      res.sendStatus(403)
    }else{
      Posts.findByIdAndRemove({_id: req.params.id}).then(function(posts) {
        if (posts != null) {
          res.send(posts)
        } else {
          res.sendStatus(404)
        }
      })
    }
  })
})


module.exports = router
