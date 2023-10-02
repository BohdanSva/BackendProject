const express = require("express");
const router = express.Router();
const asyncMySQL = require("../queries/connection");
const { registerUser, loginUser, addToken, identifyUserByEmail, deleteToken } = require("../queries/queries");
const sha256 = require("sha256");
const { v4: uuidv4 } = require("uuid");

// Register a new user
router.post("/register", async (req, res) => { // http://localhost:3001/account/register
  const { name, surname, email, password, userType } = req.body; 

  // Defensive checks - missing inputs
  if (name == "" || surname=="" || email =="" || password == "" ) {
    res.send({ status: 0, reason: "Missing required inputs"});
    return;
  }
  // Defensive checks - incorrect email format
  if (!email.includes("@")) {
    res.send({ status: 0, reason: "Incorrect email format"});
    return;
  }

  // Defensive checks - query the users table for a matching email before allowing registration to proceed
  const checkDuplicateEmails = await asyncMySQL(identifyUserByEmail(), [email]);
  if (typeof checkDuplicateEmails != "") {
    res.send({ status: 0, reason: "Duplicate email address"});
    return;
  }

  try {
    const hashedPassword = sha256(password + "spice");
    const result = await asyncMySQL(registerUser(), [name, surname, email, hashedPassword, userType]); // Save password only as a hash
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
    password === "" ||
    !email.includes("@")
  ) {
    res.send({ status: 0, reason: "Incomplete or invalid login request" });
    return;
  }

  try {
    const results = await asyncMySQL(loginUser(), [email, hashedPassword]); // Frontend sends this as an array of values to feed into the SQL prepared statements
    if (results.length > 0) { 
      const token = uuidv4();
      const userType = results[0].user_type;

      asyncMySQL(addToken(),[results[0].id, token]); // Backend sends this to database
      res.send({ status: 1, token, userType }); // Backend sends this to frontend
    } else {
      res.send({ status: 0, reason: "Bad creds!" }); 
    }
  } catch (e) {
    console.log(e);
  }
});

// Logout a user by deleting user's access tokens
router.delete("/login", async (req, res) => { // http://localhost:3001/account/login
  const token = req.body.token;

  const result = await asyncMySQL(deleteToken(), [token]);

  if (result.affectedRows > 0) {
    res.send({ status: 1 });
  } else {
    res.send({ status: 0, reason: "Logout failed" });
  }
});

module.exports = router;