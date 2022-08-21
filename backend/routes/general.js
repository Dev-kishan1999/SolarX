/**
 * @author: Kishan Savaliya - B00896729
 * @author: Kavya Raval - B00903205
 * @author: Prachi Raval - B00883324
 * @author: Radhey Rupapara - B00910695
 * @author: Meghna Rupchandani (B00888479)
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

// get panels ==============
router.get("/panels", (req, res) => {
  var query = "SELECT * FROM products WHERE type=1;";
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json(resp);
    }
  });
});
// ==========================

// get gadgets ==============
router.get("/gadgets", (req, res) => {
  var query = "SELECT * FROM products WHERE type=2;";
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json(resp);
    }
  });
});
// ==========================

// get Offers ==============
router.get("/getOffers", (req, res) => {
  var query = "SELECT * FROM offers;";
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json(resp[0]);
    }
  });
});
// ==========================

//Empty cart after order checkout
// router.post("/emptyCart", (req, res) => {
//   const { productid, quantity, userid } = req.body;
//   var query =
//     "INSERT INTO cart VALUES (NULL,'" +
//     userid +
//     "', '" +
//     productid +
//     "', '" +
//     quantity +
//     "');";
//   connection.query(query, (err, resp) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       return res.status(200).json({ message: "Added products to cart." });
//     }
//   });
// });

// add to orders ==============
router.post("/addOrders", (req, res) => {
  const utc = Date.now();
  var d = new Date(0);
  var status = "pending";
  console.log(req.body[1]);
  const { userid, price, quantity, id, deliveryAddress } = req.body;
  try {
    var query =
      "INSERT INTO orders VALUES (NULL,'" +
      id +
      "', '" +
      price +
      "', '" +
      quantity +
      "', '" +
      userid +
      "', '" +
      status +
      "', '" +
      d +
      "', '" +
      deliveryAddress +
      "');";

    console.log(query);
    connection.query(query, (err, resp) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message:
            "Error Occurred while inserting order information" + err.message,
        });
      } else {
        return res.status(200).json({ message: "Added products to order." });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" + error.message,
      success: false,
    });
  }
});

//add cart
router.post("/addcart", (req, res) => {
  var status = "pending";
  console.log(req.body[1]);
  const { userid, price, quantity, url, id } = req.body;
  try {
    var query =
      "INSERT INTO cart VALUES (NULL,'" +
      userid +
      "', '" +
      id +
      "', '" +
      quantity +
      "', '" +
      url +
      "', '" +
      price +
      "');";

    console.log(query);

    connection.query(query, (err, resp) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message:
            "Error Occurred while inserting order information" + err.message,
        });
      } else {
        return res.status(200).json({ message: "Added cart" });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" + error.message,
      success: false,
    });
  }
});

// fetch cart  ==============
router.get("/getcart", (req, res) => {
  var query = "SELECT * FROM cart WHERE userid= '" + req.query.email + "'";
  console.log("query");
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
      console.log("hthe");
    } else {
      return res.status(200).json(resp);
    }
  });
});
//cancelOrder
router.post("/cancelOrder", (req, res) => {
  const { orderid, status } = req.body;
  var query = "UPDATE orders SET STATUS ='" + status + "' WHERE ID=" + orderid;
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ message: "Order Cancelled" });
    }
  });
});

//rate orders
router.post("/rateOrders", (req, res) => {
  const { productid, rating, userid } = req.body;
  var prequery = "SELECT userid, productid FROM ratings;";
  var query =
    "UPDATE ratings SET rating ='" +
    rating +
    "' WHERE productid=" +
    productid +
    " AND userid = '" +
    userid +
    "';";
  var insertquery =
    "INSERT INTO ratings VALUES ('" +
    userid +
    "'," +
    productid +
    "'," +
    rating +
    "';";

  var flag = true;
  connection.query(prequery, (err, resp) => {
    for (index = 0; index < resp.length; index++) {
      console.log(resp[index].productid);
      console.log(resp[index].userid);

      if (
        resp[index].productid === productid &&
        resp[index].userid === userid
      ) {
        console.log("update rating");
        flag = false;
      }
    }
    if (!flag) {
      connection.query(query, (err, resp) => {
        if (err) {
          console.log(err.message);
        } else {
          return res.status(200).json({ message: "Product Rating updated" });
        }
      });
    } else {
      connection.query(insertquery, (err, resp) => {
        if (err) {
          console.log(err.message);
        } else {
          return res.status(200).json({ message: "Product rating inserted" });
        }
      });
    }
  });
});

//fetch user orders
router.get("/getOrders", (req, res) => {
  var query = "SELECT * FROM orders  WHERE userid= '" + req.query.userid + "'";
  console.log(query);
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json(resp);
    }
  });
});
// ==========================

router.post("/addfeedback", (req, res) => {
  const { userid, productid, feedback } = req.body;
  var query =
    "INSERT INTO feedback VALUES (NULL, '" +
    userid +
    "', '" +
    productid +
    "', '" +
    feedback +
    "');";
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res
        .status(200)
        .json({ message: "Feedback submitted successfully." });
    }
  });
});
// ==========================

// get nearest packages ==============
router.get("/getpackages/:powerpd", (req, res) => {
  console.log("getting packages data...");
  var query = "SELECT * FROM packages ORDER BY package_grid ";
  var power = req.params.powerpd;
  var response = [];
  console.log(power);
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      var i = 0;
      var j = 0;
      console.log(resp.length);
      while (i == 0 && resp.length > j) {
        //console.log(resp[j].power_per_day);
        if (resp[j].power_per_day >= power) {
          if (i == j) {
            //console.log("if");
            resp[j].description = "Perfect Fit (Recommended)";
            resp[j + 1].description = "More Production (Costly)";
            response.push(resp[j]);
            response.push(resp[j + 1]);
          } else if (j == resp.length - 1) {
            //console.log("else if");
            resp[j].description = "Perfect Fit (Recommended)";
            resp[j - 1].description = "Less Prodcution (Budget)";
            response.push(resp[j - 1]);
            response.push(resp[j]);
          } else {
            //console.log("else");
            resp[j - 1].description = "Less Prodcution (Budget)";
            resp[j].description = "Perfect Fit (Recommended)";
            resp[j + 1].description = "More Production (Costly)";
            response.push(resp[j - 1]);
            response.push(resp[j]);
            response.push(resp[j + 1]);
          }
          i++;
        }
        j++;
      }
      return res.status(200).json(response);
    }
  });
});
// ==========================

// get all packages ==============
router.get("/getpackages", (req, res) => {
  console.log("getting packages data...");
  var query = "SELECT * FROM packages ORDER BY package_grid ";
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json(resp);
    }
  });
});
// ==========================

// predict bill ==============
router.post("/predictbill", (req, res) => {
  console.log("predicting bill...");
  var query = "SELECT * FROM unit_consumption";
  var number = req.body;
  connection.query(query, (err, resp) => {
    if (err) {
      console.log(err.message);
    } else {
      var consumption = number.fans * resp[0].fan;
      consumption += number.tvs * resp[0].tv;
      consumption += number.heaters * resp[0].heater;
      consumption += number.fridges * resp[0].fridge;
      //console.log(consumption);
      return res.status(200).json({ consumption: consumption });
    }
  });
});
// ==========================

// Get all bogs =============
router.get('/allblogs',(req,res)=>{
  var query = 'SELECT * FROM blogs;'
  connection.query(query,(err,resp)=>{
    if(err){
      console.log("ERROR:",err.message);
    } else {
      return res.status(200).json(resp)
    }
  })
})
// ==========================

module.exports = router;
