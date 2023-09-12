const express = require("express");
const router = express.Router();
const asyncMySQL = require("../queries/connection");
const { getBlog } = require("../queries/queries");

router.get("/", async (req, res) => { // http://localhost:3001/blog/
  const results = await asyncMySQL(getBlog()); // The blog contents are sent to the frontend in the object "results"
  if (results.length > 0) {
    res.send({ status: 1, results }); 
    return;
  }
  res.send({ status: 0, reason: "No blog data found" });
});

module.exports = router;