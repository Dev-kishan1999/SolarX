/**
 * Author : Kishan Mahendrabhai Savaliya - (B00896729)
 */
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

// Admin Register ========
router.post("/admin-register", (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please Enter all the details." });
  }
  var query = "SELECT id FROM user WHERE email=" + email + ";";
  connection.query(query, (err, resp) => {
    if (!resp) {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        var uploadQuery =
          "INSERT INTO user (email,password,name,role) VALUES ('" +
          email +
          "','" +
          password +
          "','" +
          name +
          "','" +
          1 +
          "');";
        connection.query(uploadQuery, (err, response) => {
          if (err) {
            return res
              .status(422)
              .json({ error: "Problem in registering the user." });
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

// Admin Login  ============
router.post("/admin-login", (req, res) => {
  try {
    console.log("Here")
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "Please enter all the credentials." });
    }
    const role = 1;
    var query = `select * from user where email='${email}' and role=${role};`;
    console.log(query);
    connection.query(query, async (err, resp) => {
      console.log("matched")
      if (err) {
        console.log(err.message);
      } else {  
        console.log(resp[0]);
        // const match = await bcrypt.compare(resp[0].password,password);
        if (password === resp[0].password) {
          console.log("matched")
          const token = JWT.sign(email, "qwertyuiop");
          const user = {
            email: resp[0].email,
            name: resp[0].name,
            token,
          };
          return res.status(200).json({ user });
        } else {
          console.log("Here 3.")
          return res.status(422).json({ error: "user does not exist." });
        }

      }
  });
  } catch (err) {
    return res.status(500).json({ error: "Invalid data to process." });
  }
});
// ==========================

// fetch orders =============
router.get("/admin-order", (req, res) => {
  var query = "SELECT * FROM orders;";
  connection.query(query, (err, resp) => {
    if (err) {
      console.log("Err:", err.message);
    } else {
      return res.status(200).json(resp);
    }
  });
});
// ==========================

// Fetch stock ==============
router.get("/admin-stock", (req, res) => {
  const header = req.headers["authorization"];
  var query =
    "SELECT * FROM stock INNER JOIN products ON stock.productid = products.id WHERE stock.oos=0 AND products.del=0;";
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json(resp);
    }
  });
});
// ==========================

// update stock ==============
router.put("/admin-stock-update", (req, res) => {
  const header = req.headers["authorization"];
  const { productid, quantity } = req.body;
  var query = `UPDATE stock SET quantity=${quantity} WHERE productid=${productid};`;
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ message: "Updated." });
    }
  });
});
// ==========================

// out of stock ==============
router.put("/admin-out-of-stock/:productid", (req, res) => {
  const { productid } = req.params;
  const oos = 1;
  var query = `UPDATE stock SET oos=${oos} WHERE productid=${productid};`;
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ message: "Done." });
    }
  });
});
// ==========================

// Get products =============
router.get("/admin-products", (req, res) => {
  var query = "SELECT * FROM products WHERE del=0;";
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json(resp);
    }
  });
});
// ==========================

// Delete product ==============
router.delete("/admin-product-delete/:productid", (req, res) => {
  const { productid } = req.params;
  const quantity = 0;
  var queryStock = `UPDATE products SET del=1 WHERE id=${productid};`; //UPDATE stock SET quantity=${quantity} WHERE productid=${productid};
  connection.query(queryStock, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ message: "Product deleted." });
    }
  });
});
//===========================

// Update product ==============
router.put("/admin-product-update/:productid", (req, res) => {
  const { productid } = req.params;
  const { name, description, price, stock } = req.body;
  const quantity = 0;
  var queryStock = `UPDATE products SET name='${name}',description='${description}',price='${price}',stock='${stock}' WHERE id=${productid};`;
  connection.query(queryStock, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ message: "Product Updated." });
    }
  });
});
//===========================

// get services and appointments =====
router.get("/admin-appointment", (req, res) => {
  var query = "SELECT * FROM appointment;";
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json(resp);
    }
  });
});
//===========================

// get Feedback =====
router.get("/admin-feedback", (req, res) => {
  var query = "SELECT * FROM feedback;";
  connection.query(query, (err, resp) => {
    if (err) {
      ``;
      console.log(err.message);
    } else {
      return res.status(200).json(resp);
    }
  });
});
//===========================

// add panel ================
router.post("/admin-add-panel", (req, res) => {
  const { name, description, price } = req.body;
  var query =
    "INSERT INTO products VALUES ('NULL','" +
    name +
    "', '1', '" +
    description +
    "', '" +
    price +
    "');";
  connection.query(query, (err, resp) => {
    console.log(query);
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ message: "Panel added successfully." });
    }
  });
});
// ===========================

// add panel ================
router.post("/admin-add-gadget", (req, res) => {
  const { name, description, price } = req.body;
  var query =
    "INSERT INTO products VALUES ('NULL','" +
    name +
    "', '2', '" +
    description +
    "', '" +
    price +
    "');";
  connection.query(query, (err, resp) => {
    console.log(query);
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ message: "Gadget added successfully." });
    }
  });
});
// ===========================

module.exports = router;

// https://auth-db458.hstgr.io/
