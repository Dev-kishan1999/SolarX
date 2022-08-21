const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// database connection
const connection = mysql.createPool({
  host: "auth-db458.hstgr.io",
  port: 3306,
  user: "u127518673_solarx",
  password: "Solarx@21",
  database: "u127518673_solarx",
  acquireTimeout: 1000,
  connectionLimit: 10,
});


router.post('/addAppointment', (req, res) => {
    var service= req.body.service;
    var date = req.body.date;
    var time = req.body.time;
    var userid = req.body.userid;
    console.log(req.body)
    let insertQuery= `INSERT INTO appointment VALUES (NULL,'${service}','${date}','${userid}', '${time}' );`;       
 
    connection.query(insertQuery, (err, resp) => {
        if(!err) 
          return res.status(200).json({ message:" Appointment added successfully"});
        else 
          console.log(err.message);
     });
 });


router.put('/editAppointment/:userid', (req, res) => {
    var date = req.body.date;
    var time = req.body.time;
   
    let editQuery = `UPDATE appointment SET date='${date}', time='${time}' WHERE userid='${req.params.userid}';`;       
 
    connection.query(editQuery, [date, time], (err, resp) => {
        if(!err) 
          return res.status(200).json({ message:"Appointment updated"});
        else 
          console.log(err.message);
     });
 });



// Delete appointment ==============
router.delete("/deleteAppointment/:email",(req,res)=>{
    // var userid = req.body.userid;
    // console.log(req.body)
    let deleteQuery = `DELETE FROM appointment WHERE userid='${req.params.email}';`;
    connection.query(deleteQuery,(err,resp)=>{
        if(err){
          console.log(err.message);
        } else {
          return res.status(200).json({ message:"Appointment deleted."});
        }
    })
})
// fetch appointments =============
router.get("/viewAppointment/:email",(req,res) => {
    const {email} = req.params;
    var fetchQuery = `SELECT * FROM appointment WHERE userid='${email}';`;
    connection.query(fetchQuery,(err,resp)=>{
        if(err){
            console.log("Err:",err.message);
        } else {
            return res.status(200).json(resp);
        }
    })
})

// ==========================

module.exports = router;
