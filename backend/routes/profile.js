/**
 * @author: Mayank Sareen - B00899565
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

function getCurrentDate() {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let separator = "-";
  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}

function getCurrentTime() {
  let newDate = new Date();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let separator = ":";
  return `${hours}${separator}${minutes}`;
}
function updateTransactions(email, amount, name, type, res) {
  try {
    let date = getCurrentDate();
    let time = getCurrentTime();
    var transactionTableInsertion =
      "INSERT INTO transaction VALUES (NULL, '" +
      email +
      "', '" +
      amount +
      "', '" +
      type +
      "', '" +
      name +
      "', '" +
      date +
      "', '" +
      time +
      "');";
    connection.query(transactionTableInsertion, (err, resp) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message:
            "Error Occurred while updating transactions in table" + err.message,
        });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Transaction Complete!" });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" + error.message,
      success: false,
    });
  }
}

router.post("/update-profile", (req, res) => {
  const { email, url, name, phone, city, apt, pincode, street, cwb } = req.body;
  var query = `UPDATE user SET imgurl='${url}', email='${email}', name = '${name}', phone='${phone}', city='${city}', apt='${apt}',
  pincode ='${pincode}', street='${street}', cwb='${cwb}' WHERE email='${email}';`;
  try {
    connection.query(query, (err, resp) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message:
            "An error occurred while updating user profile " + err.message,
        });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "User Profile updated." });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error" + error.message,
    });
  }
});

router.post("/add-referral", (req, res) => {
  const { email, name, phone, refmail } = req.body;
  try {
    var query =
      "INSERT INTO refferals VALUES ('" +
      name +
      "', '" +
      email +
      "', '" +
      phone +
      "', '" +
      refmail +
      "');";

    connection.query(query, (err, resp) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message:
            "Error Occurred while inserting referral information" + err.message,
        });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Referral Information entered." });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" + error.message,
      success: false,
    });
  }
});

router.post("/referral-registration", (req, res) => {
  const { email } = req.body;
  try {
    var retriveReferral = `SELECT * FROM refferals WHERE email='${email}';`;
    connection.query(retriveReferral, (err, results, resp) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message:
            "Error Occurred while retrieving referral information" +
            err.message,
        });
      } else if (results.length) {
        let referrerEmail = results[0].refmail;
        var updateReffererWallet = `UPDATE user SET cwb = cwb + 100 WHERE email='${referrerEmail}';`;
        connection.query(updateReffererWallet, (err, results, resp) => {
          if (err) {
            return res.status(422).json({
              success: false,
              message:
                "Error Occurred while updating referrer wallet" + err.message,
            });
          } else if (results) {
            var updateReffereeWallet = `UPDATE user SET cwb = cwb + 100 WHERE email='${email}';`;
            connection.query(updateReffereeWallet, (err, results, resp) => {
              if (err) {
                return res.status(422).json({
                  success: false,
                  message:
                    "Error Occurred while updating referree wallet" +
                    err.message,
                });
              } else if (results) {
                var deleteReferee = `DELETE FROM refferals WHERE email='${email}'`;
                connection.query(deleteReferee, (err, results, resp) => {
                  if (err) {
                    return res.status(422).json({
                      success: false,
                      message:
                        "Error Occurred while deleting referrals from table" +
                        err.message,
                    });
                  } else {
                    return res.status(200).json({
                      success: true,
                      isReferral: true,
                      message:
                        "Congratulations! You have earned a $100 referral bonus in your wallet!",
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        return res.status(200).json({ success: true, isReferral: false });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" + error.message,
      success: false,
    });
  }
});

router.get("/get-transactions/:email", (req, res) => {
  try {
    const email = req.params.email.trimEnd();
    var query = `Select * FROM transaction WHERE email='${email}';`;
    connection.query(query, (err, results, resp) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message:
            "Error Occurred while fetching transactions from table" +
            err.message,
        });
      } else if (results) {
        return res.status(200).json({ success: true, transactions: results });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "No transactions done yet!" });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" + error.message,
      success: false,
    });
  }
});

router.post("/Update-Transaction-Table", (req, res) => {
  try {
    const { email, amount } = req.body;
    updateTransactions(email, amount, "Purchase Order", "2", res);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" + error.message,
      success: false,
    });
  }
});

router.post("/Add-to-Wallet", (req, res) => {
  try {
    const { email, cwb, amount, name, type } = req.body;
    var userBalanceUpdate = `UPDATE user SET cwb='${cwb}' WHERE email='${email}';`;
    connection.query(userBalanceUpdate, (err, resp) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message:
            "Error Occurred while updating the wallet balance" + err.message,
        });
      } else {
        updateTransactions(email, amount, name, type, res);
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" + error.message,
      success: false,
    });
  }
});

router.get("/get-user-consumption/:email", (req, res) => {
  try {
    const email = req.params.email.trimEnd();
    var userConsumptionQuery = `Select * FROM user_monthly_consumption WHERE user_id='${email}';`;
    var consumptionData = [];
    connection.query(userConsumptionQuery, (err, results, resp) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message:
            "An error occurred while updating user profile " + err.message,
        });
      } else if (results.length) {
        consumptionData = results;
        var retriveUnitPrices = `SELECT * FROM Per_Unit_Cost;`;
        connection.query(retriveUnitPrices, (err, results, resp) => {
          if (err) {
            return res.status(422).json({
              success: false,
              message: "Error Occurred while fetching unit costs" + err.message,
            });
          } else if (results.length) {
            let labels = [];
            let electricity_prices = [];
            let solar_prices = [];
            let userSavings = {};
            for (i in consumptionData) {
              if (!labels.includes(consumptionData[i].Month)) {
                labels.push(consumptionData[i].Month);
              }
              electricity_prices.push(
                consumptionData[i].Consumption * results[0].Electricity_Price
              );
              solar_prices.push(
                consumptionData[i].Consumption * results[0].Solar_Price
              );
            }
            userSavings.labels = labels;
            userSavings.electricity_prices = electricity_prices;
            userSavings.solar_prices = solar_prices;
            return res
              .status(200)
              .json({ success: true, userConsumption: userSavings });
          }
        });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "No User Consumption recorded!" });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" + error.message,
      success: false,
    });
  }
});

module.exports = router;
