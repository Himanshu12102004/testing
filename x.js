const express = require("express");
const useragent = require("useragent");

const app = express();

app.get("/", (req, res) => {
  // Extracting user agent and IP address from the request
  const userAgent = req.headers["user-agent"];
  const ip =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress;

  // Parsing user agent string using useragent package
  const agent = useragent.parse(userAgent);

  // Extracting device type, operating system, browser, and browser version
  const deviceType = agent.device.family;
  const os = agent.os.family;
  const browser = agent.family;
  const browserVersion = agent.toVersion();

  // Additional information extraction can be added here

  // Constructing the result object
  const result = {
    userAgent,
    ip,
    deviceType,
    os,
    browser,
    browserVersion,
  };

  // Sending the result as JSON
  res.json(result);
});

// Starting the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
