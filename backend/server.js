// Imports
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const accountAPIs = require('./endpoints/account');
const adminAPIs = require("./endpoints/admins")
const userAPIs = require("./endpoints/user")
const blogAPIs = require('./endpoints/blog');
const authenticateToken = require("./middleware/authentication");
const limiter = require("./middleware/limiter");
const helmet = require("helmet");
const path = require("path");

// Server setup
const app = express();
app.use(express.static('public')); // Make the files in the server-side "public" folder accessible from the frontend (//"public" -> // accessed from http://localhost:3001/)
const PORT = process.env.PORT || 3001;
app.use(helmet({
  crossOriginResourcePolicy: false, // To allow frontend to display static images that live on the backend server
}));
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

// API Endpoints
app.use("/account", accountAPIs); 
app.use("/admin", authenticateToken, adminAPIs);
app.use("/user", authenticateToken, userAPIs);
app.use("/blog", blogAPIs); 

// Server listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});