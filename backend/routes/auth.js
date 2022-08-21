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

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Success" });
});

// Register user =========
router.post("/register", (req, res) => {
  const { email, password, name, apt, street, city, pincode, url, phone } =
    req.body;
  if (
    !email ||
    !password ||
    !name ||
    !apt ||
    !street ||
    !city ||
    !pincode ||
    !phone ||
    !url
  ) {
    return res.status(422).json({ error: "Please Enter all the details." });
  }
  var query = "SELECT id FROM user WHERE email=" + email + ";";
  connection.query(query, (err, resp) => {
    if (!resp) {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        var uploadQuery =
          "INSERT INTO user VALUES ('" +
          email +
          "','" +
          hashedPassword +
          "','" +
          name +
          "','" +
          apt +
          "','" +
          street +
          "','" +
          city +
          "','" +
          pincode +
          "','" +
          2 +
          "','" +
          url +
          "','" +
          phone +
          "','0');";
        connection.query(uploadQuery, (err, response) => {
          if (err) {
            if (err.message.toLowerCase().includes("duplicate")) {
              return res.status(422).json({
                error: "User already exists!",
              });
            } else {
              return res.status(422).json({
                error: "Problem in registering the user.",
              });
            }
          } else {
            return res
              .status(200)
              .json({ message: "Registered Successfully." });
          }
        });
      });
    } else {
      return res.status(422).json({ error: "User already exist with email." });
    }
  });
});
// ==========================

// Login user ============
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "Please enter all the credentials." });
    }
    const role = 2;
    var query = `select * from user where email='${email}' and role=${role};`;
    connection.query(query, async (err, results, resp) => {
      if (err) {
        return res.status(422).json({ error: "user does not exist." });
      } else if (results.length) {
        console.log("decyrpting started.");
        bcrypt.compare(password, results[0].password, (err, matched) => {
          if (err) {
            console.log("ERROR:", err.message);
          } else {
            const token = JWT.sign(email, "qwertyuiop");
            const user = {
              email: results[0].email,
              name: results[0].name,
              apt: results[0].apt,
              street: results[0].street,
              city: results[0].city,
              pincode: results[0].pincode,
              imgurl: results[0].imgurl,
              phone: results[0].phone,
              cwb: results[0].cwb,
              token,
            };
            return res.status(200).json({ user });
          }
        });
        // if (password !== results[0].password) {
        //   return res.status(422).json({ error: "Incorrect credentials!" });
        // } else {
        //   const token = JWT.sign(email, "qwertyuiop");
        //   const user = {
        //     email: results[0].email,
        //     name: results[0].name,
        //     apt: results[0].apt,
        //     street: results[0].street,
        //     city: results[0].city,
        //     pincode: results[0].pincode,
        //     imgurl: results[0].imgurl,
        //     phone: results[0].phone,
        //     cwb: results[0].cwb,
        //     token,
        //   };
        //   return res.status(200).json({ user });
        // }
      } else {
        //if (results.length == 0)
        return res.status(404).json({ error: "User not found!" });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: "Invalid data to process." });
  }
});
// ==========================

// forget password ==========
router.put("/fp", (req, res) => {
  const { email, npassword } = req.body;
  bcrypt.hash(npassword, 12).then((hnpassword) => {
    var query = `UPDATE user SET password='${hnpassword}' WHERE email='${email}';`;
    connection.query(query, (err, resp) => {
      if (err) {
        console.log(err.message);
      } else {
        return res
          .status(200)
          .json({ message: "Your password has been reset." });
      }
    });
  });
});
// ==========================

module.exports = router;

// https://auth-db458.hstgr.io/
