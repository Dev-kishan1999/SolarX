const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

// database connection
const connection = mysql.createPool({
  host: 'auth-db458.hstgr.io',
  port: 3306,
  user: 'u127518673_solarx',
  password: 'Solarx@21',
  database: 'u127518673_solarx',
  acquireTimeout: 1000,
  connectionLimit: 10,
})

// add feedback ================
router.post('/AddfeedbackMessage', (req, res) => {
  var name = req.body.name
  // var email = req.body.email;
  var feedback = req.body.feedback
  console.log(req.body)
  let insertQuery = `INSERT INTO feedback VALUES (NULL,'${name}','${feedback}');`
  connection.query(insertQuery, (err, resp) => {
    if (err) {
      console.log(err.message, 'error occured')
    } else {
      return res.status(200).json({ message: 'Feedback added' })
    }
  })
// return res.send("message for postman");
})

// fetch feedbacks =============
router.get('/viewFeedback', (req, res) => {
  var fetchQuery = 'SELECT * FROM feedback;'
  connection.query(fetchQuery, (err, resp) => {
    if (err) {
      console.log('Err:', err.message)
    } else {
      return res.status(200).json(resp)
    }
  })
})

module.exports = router
