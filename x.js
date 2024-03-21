const express = require("express");
const requestIp = require("request-ip");

const app = express();

// Create a middleware function to get the client's IP address.
const getIp = (req, res, next) => {
  req.ip = requestIp.getClientIp(req);
  next();
};

// Add the middleware function to the Express server.
app.use(getIp);

// Start the Express server.
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
