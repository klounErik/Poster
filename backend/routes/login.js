const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/userModel')
const secret = require('../config')
const verifyToken = require('../auth')

router.post('/login', (req, res) => {
  const User = {
    email: req.body.email,
    password: req.body.password,
  }

  const payload = User
  try{
    Users.findOne({email: User.email}).then(function(result) {
      if (bcrypt.compareSync(User.password, result.password)) {
        jwt.sign(payload, secret.secret, {expiresIn: '240s'}, (err, token) =>{
          if(err){
            console.log(err)
            res.sendStatus(403)
          }else{
            res.send({token});
            console.log(process.env)
          }
        })
      } else {
        res.sendStatus(404, 'could not find user')
      }
    })
  }catch(error) {
    res.json('error')
  }
})

router.post('/test', verifyToken, (req,res) => {

    jwt.verify(req.token, secret.secret, (err, authData) =>{
      if(err){
        console.log(err)
        res.sendStatus(403)
      } else{
        res.json({
          message: 'hello world',
          authData: authData
        })
      }
    })
  })
 
module.exports = router
