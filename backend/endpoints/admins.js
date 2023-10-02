const express = require("express");
const router = express.Router();
const asyncMySQL = require("../queries/connection");
const { deleteBlogPost, addBlogPost, updateBlogPost, getUserStats, getPropertyStats, getInvestorStats, getContactStats } = require("../queries/queries");

// User management
router.get("/users", async (req, res) => { // http://localhost:3001/admin/users
  const results = await asyncMySQL(getUserStats());
  if (results.length > 0) {
    res.send({ status: 1, results }); 
    return;
  }
  res.send({ status: 0, reason: "No user data found" });
});

// Property management
router.get("/property", async (req, res) => { // http://localhost:3001/admin/property
  const results = await asyncMySQL(getPropertyStats());
  if (results.length > 0) {
    res.send({ status: 1, results }); 
    return;
  }
  res.send({ status: 0, reason: "No user data found" });
});

// Investor management
router.get("/investors", async (req, res) => { // http://localhost:3001/admin/investors
  const results = await asyncMySQL(getInvestorStats());
  if (results.length > 0) {
    res.send({ status: 1, results }); 
    return;
  }
  res.send({ status: 0, reason: "No user data found" });
});

// Contact management
router.get("/contacts", async (req, res) => { // http://localhost:3001/admin/contacts
  const results = await asyncMySQL(getContactStats());
  if (results.length > 0) {
    res.send({ status: 1, results }); 
    return;
  }
  res.send({ status: 0, reason: "No user data found" });
});


// Blog management
router.delete("/blog/:id", async (req, res) => { // http://localhost:3001/admin/blog/ID
  const id = Number(req.params.id);

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid blog ID" });
    return;
  }

  const result = await asyncMySQL(deleteBlogPost(), [id]);
  if (result.affectedRows > 0) {
    res.send({ status: 1 });
  } else {
    res.send({ status: 0, reason: "Delete failed" });
  }
});

router.post("/blog", async (req, res) => { // http://localhost:3001/admin/blog
    // Blog Post ID and date added are generated automatically by the SQL database, so you're not sending it
    const { articleTopic, headline, textBlock } = req.body; 
    
    // Defensive checks
    if (
        !articleTopic ||
        !headline ||
        !textBlock ||
        typeof articleTopic !== "string" ||
        typeof headline !== "string" ||
        typeof textBlock !== "string"
        ) 
    {
      res.send({ status: 0, reason: "Incomplete or invalid request" });
      console.log("You've failed defensive check!");
      return;
    }
    try {
      await asyncMySQL(addBlogPost(),[articleTopic, headline, textBlock]);
      res.send({ status: 1 });
    } catch (error) {
      console.log(error);
      res.send({ status: 0, reason: "Duplicate entry" });
    }
});

router.patch("/blog/:id", async (req, res) => { // http://localhost:3001/admin/blog/ID
const id = Number(req.params.id);
const { articleTopic, headline, articleDate, textBlock } = req.body; 

    // Defensive checks
    if (Number.isNaN(id)) {
        res.send({ status: 0, reason: "Invalid property ID" });
        return;
    }

    try {
        await asyncMySQL(updateBlogPost(), [articleTopic, headline, articleDate, textBlock, id])
        res.send({ status: 1 }); // Should only run if the query works
      } catch (error) {
        console.log(error);
        res.send({ status: 0, reason: error.sqlMessage });
      }

});

module.exports = router;
