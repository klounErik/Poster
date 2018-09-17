//Fjerne token fra header
const express = require('express')
const router = express.Router()

router.get('/logout', (req, res) => {
  res.clearCookie('Authorization', 'Bearer ')
  res.sendStatus(200)
})

module.exports = router
