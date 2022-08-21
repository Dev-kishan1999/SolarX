/**
 * Entire whole
 */
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mysql = require("mysql");
const config = require("./config");
const cors = require("cors");

app.use(cors());

const connection = mysql.createPool({
  host: "auth-db458.hstgr.io",
  port: 3306,
  user: "u127518673_solarx",
  password: "Solarx@21",
  database: "u127518673_solarx",
  acquireTimeout: 1000,
  connectionLimit: 10,
});
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/admin'));
app.use(require('./routes/general'));
app.use(require('./routes/profile'));
app.use(require('./routes/appointments'));
app.use(require('./routes/feedback'));

// connection.query("SELECT * FROM user WHERE 1",(err,res)=>{
//     if(err){
//         console.log("Error:",err.message)
//         return
//     } else {
//         console.log("Successfully queried.",res)
//     }
// });

app.listen(PORT, () => {
  console.log(`App is listening on the port : ${PORT}.`);
});
