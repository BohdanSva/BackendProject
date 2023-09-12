const express = require("express");
const router = express.Router();
const asyncMySQL = require("../queries/connection");
const { registerUser, loginUser, addToken } = require("../queries/queries");
const sha256 = require("sha256");
const { v4: uuidv4 } = require("uuid");

// Register a new user
router.post("/register", async (req, res) => { // http://localhost:3001/account/register
    const { name, surname, email, password, userType } = req.body; 
    try {
      const hashedPassword = sha256(password + "spice");
      const result = await asyncMySQL(registerUser(name, surname, email, hashedPassword, userType)); // Save password only as a hash
      // The above sequence of data sent must match the SQL query sequence of variables!
      res.send({ status: 1, userId: result.insertId, type: userType});
    } catch (e) {
      res.send({ status: 0 });
    }
});

// Authenticate user on login
router.post("/login", async (req, res) => { // http://localhost:3001/account/login
  const { email, password } = req.body;
  const hashedPassword = sha256(password + "spice");

  // Defensive checks - security
  if (email === "%") {
    return;
  }
  if (email.toLowerCase().includes("not like")) {
    return;
  }

  // Defensive checks - correct input types
  if (
    !email ||
    !password ||
    typeof email !== "string" || 
    typeof password !== "string" || 
    email === "" ||
    password === ""
  ) {
    res.send({ status: 0, reason: "Incomplete or invalid login request" });
    return;
  }

  try {
    const results = await asyncMySQL(loginUser(email, hashedPassword)); // Frontend sends this here
    if (results.length > 0) { 
      const token = uuidv4();
      const userType = results[0].user_type;

      asyncMySQL(addToken(results[0].id, token)); // Backend sends this to database
      res.send({ status: 1, token, userType }); // Backend sends this to frontend
    } else {
      res.send({ status: 0, reason: "Bad creds!" }); 
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;