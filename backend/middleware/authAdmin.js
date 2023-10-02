const asyncMySQL = require("../queries/connection");
const { identifyUserByToken } = require("../queries/queries");

const authAdmin = async (req, res, next) => {
  const results = await asyncMySQL(identifyUserByToken(), [req.headers.token]);

  if (results.length === 1) {
    req.validatedUserId = results[0].user_id; // Attach token id to the request
    next(); // Continue route if correct token
    return;
  }
  res.send({ status: 0, reason: "Bad token" });
};

module.exports = authAdmin;
