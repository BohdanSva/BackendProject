const express = require("express");
const router = express.Router();
const asyncMySQL = require("../queries/connection");
const multer = require("multer"); // To save file on disk
const path = require("path"); // File name manipulation
const fs = require('fs'); // To delete files from disk
const { addProperty, getUserProperties, getPropertyById, updateProperty, deleteProperty, addContact, getUserContacts, addInvestor,
  getUserInvestors, getInvestorById, updateInvestor, deleteInvestor, updateContact, deleteContact, addImageProperty, getContactById } 
= require("../queries/queries");

// Image storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../backend-project/backend/public/images") // Directory where we want to store user-uploaded images
  }, // If no destination is given, the operating system's default directory for temporary files is used
  filename: (req, file, cb) => { // Naming convention for uploaded files, attaching the extension (bmp, jpg) of the original file
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)) 
  }
})
const upload = multer({
  storage: storage
});

// Create a new property
router.post("/property/", async (req, res) => { // http://localhost:3001/user/property/
    const { name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, development, gdv, capex,
      units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, futureRent, futureOpex,
      futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, brokerFee
     } = req.body;
  
    // Defensive checks
    // if (
    //     !street ||
    //     !city ||
    //     !postcode ||
    //     !rent ||
    //     !area ||
    //     typeof street !== "string" ||
    //     typeof city !== "string" ||
    //     typeof postcode !== "string" ||
    //     typeof rent !== "number" ||
    //     typeof area !== "number"
    // ) {
    //   res.send({ status: 0, reason: "Incomplete or invalid request" });
    //   console.log("You've failed defensive check!");
    //   return;
    // }
  
    try {
      await asyncMySQL(
        addProperty(req.validatedUserId, name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, development,
          gdv, capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, futureRent,
          futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, brokerFee)
        // user ID = req.validatedUserId that you get from your authorisation middleware
      );
      res.send({ status: 1 });
    } catch (error) {
      console.log(error);
      res.send({ status: 0, reason: "Duplicate entry" });
    }
});

// Get all user's properties
router.get("/property", async (req, res) => { // http://localhost:3001/user/property
  const results = await asyncMySQL(getUserProperties(req.validatedUserId));
  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }
  res.send({ status: 0, reason: "ID not found" });
});

// Get a particular user-created property by property ID
router.get("/property/:id", async (req, res) => { // http://localhost:3001/user/property/id
  const id = Number(req.params.id);

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid ID" });
    return;
  }

  const results = await asyncMySQL(getPropertyById(id, req.validatedUserId));
  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }
  res.send({ status: 0, reason: "ID not found" });
});

// Delete a particular user-created property by property ID
router.delete("/property/:id", async (req, res) => { // http://localhost:3001/user/property/id
  const id = Number(req.params.id);

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid ID" });
    return;
  }

  const result = await asyncMySQL(deleteProperty(id, req.validatedUserId));

  if (result.affectedRows > 0) {
    res.send({ status: 1 });
  } else {
    res.send({ status: 0, reason: "Delete failed" });
  }
});

// Update a particular user-created property by property ID
router.patch("/property/:id", async (req, res) => { // http://localhost:3001/user/property/id
  const id = Number(req.params.id);
  const { name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, development,
    gdv, capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, futureRent,
    futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, brokerFee} 
    = req.body;

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid property ID" });
    return;
  }

  try {
    await asyncMySQL(updateProperty(name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, 
      development, gdv, capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi,
      futureRent, futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure,
      brokerFee, id, req.validatedUserId))
    res.send({ status: 1 }); // Should only run if the query works
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
  }
});

// Save new image file to disk, delete old image, save image filename to locate it in "/public/images" folder, for a user's 
// property by property ID
router.post("/property/:id", upload.single('image'), async (req, res) => { // http://localhost:3001/user/property/id
  const id = Number(req.params.id);
  const image = req.file.filename; // new image filename
  const oldImage = req.body.oldImage; // filename of the old image

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid property ID" });
    return;
  }

  try {
    await asyncMySQL(addImageProperty(image, id, req.validatedUserId));
    oldImage &&
    fs.unlink("../../backend-project/backend/public/images/" + oldImage, (error) => { // Delete old image
      if (error) {
        throw error;
      }
      console.log("Old image deleted");
    });
    res.send({ status: 1 }); // Should only run if the query works
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
  }
});

// Get all user's contacts
router.get("/contacts", async (req, res) => { // http://localhost:3001/user/contacts
  const results = await asyncMySQL(getUserContacts(req.validatedUserId));
  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }
  res.send({ status: 0, reason: "ID not found" });
});

// Get a particular user-created contact by ID
router.get("/contacts/:id", async (req, res) => { // http://localhost:3001/user/contacts/id
  const id = Number(req.params.id);

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid ID" });
    return;
  }

  const results = await asyncMySQL(getContactById(id, req.validatedUserId));
  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }
  res.send({ status: 0, reason: "ID not found" });
});

// Create a new contact
router.post("/contacts/", async (req, res) => { // http://localhost:3001/user/contacts/id
  const { name, surname, company, email, phone, contactDate, job, role, city } = req.body;
  try {
    await asyncMySQL(
      addContact(req.validatedUserId, name, surname, company, email, phone, contactDate, job, role, city)
      // user ID = req.validatedUserId that you get from your authorisation middleware
    );
    res.send({ status: 1 });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, reason: "Duplicate entry" });
  }
});

// Update a user's contact by ID
router.patch("/contacts/:id", async (req, res) => { // http://localhost:3001/user/contacts/id
  const id = Number(req.params.id);
  const { name, surname, company, email, phone, contactDate, job, role, city} 
    = req.body;

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid property ID" });
    return;
  }
  
  try {
    await asyncMySQL(updateContact(name, surname, company, email, phone, contactDate, job, role, city, id, req.validatedUserId))
    res.send({ status: 1 }); // Should only run if the query works
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
  }
});

// Delete a user's contact by ID
router.delete("/contacts/:id", async (req, res) => { // http://localhost:3001/user/contacts
  const id = Number(req.params.id);

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid ID" });
    return;
  }

  const result = await asyncMySQL(deleteContact(id, req.validatedUserId));

  if (result.affectedRows > 0) {
    res.send({ status: 1 });
  } else {
    res.send({ status: 0, reason: "Delete failed" });
  }
});

// Get all user's investors
router.get("/investors", async (req, res) => { // http://localhost:3001/user/investors
  const results = await asyncMySQL(getUserInvestors(req.validatedUserId));
  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }
  res.send({ status: 0, reason: "ID not found" });
});

// Get a particular user-created investor by ID
router.get("/investors/:id", async (req, res) => { // http://localhost:3001/user/investor/id
  const id = Number(req.params.id);

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid ID" });
    return;
  }

  const results = await asyncMySQL(getInvestorById(id, req.validatedUserId));
  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }
  res.send({ status: 0, reason: "ID not found" });
});

// Create a new investor
router.post("/investors/", async (req, res) => { // http://localhost:3001/user/investors
  const { investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, targetGeography, minSize,
    maxSize, ccy, minWalb, maxWalb, minYield, contactId
  } = req.body;

  try {
    await asyncMySQL(
      addInvestor(req.validatedUserId, investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, 
        targetGeography, minSize, maxSize, ccy, minWalb, maxWalb, minYield, contactId)
      // user ID = req.validatedUserId that you get from your authorisation middleware
    );
    res.send({ status: 1 });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, reason: "Duplicate entry" });
  }
});

// Update a particular user-created investor by ID
router.patch("/investors/:id", async (req, res) => { // http://localhost:3001/user/investors/id
  const id = Number(req.params.id);
  const { investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, targetGeography, minSize,
    maxSize, ccy, minWalb, maxWalb, minYield, contactId} 
    = req.body;

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid property ID" });
    return;
  }
  
  try {
    await asyncMySQL(updateInvestor(investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, 
      targetGeography, minSize, maxSize, ccy, minWalb, maxWalb, minYield, contactId, id, req.validatedUserId))
    res.send({ status: 1 }); // Should only run if the query works
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
  }
});

// Delete a particular user-created investor by ID
router.delete("/investors/:id", async (req, res) => { // http://localhost:3001/user/investors/id
  const id = Number(req.params.id);

  // Defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid ID" });
    return;
  }

  const result = await asyncMySQL(deleteInvestor(id, req.validatedUserId));

  if (result.affectedRows > 0) {
    res.send({ status: 1 });
  } else {
    res.send({ status: 0, reason: "Delete failed" });
  }
});


module.exports = router;
