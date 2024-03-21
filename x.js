const express = require("express");
const geoip = require("geoip-lite");
const net = require("net");

const app = express();

// Middleware to get the client's IP address
app.use((req, res, next) => {
  req.clientIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  next();
});

app.get("/", (req, res) => {
  const clientIp = req.clientIp;

  // Normalize IPv6 address if it's an IPv6 address
  const ipv6Address = net.isIPv6(clientIp) ? `[${clientIp}]` : clientIp;

  // Use geoip-lite to get location information
  const geo = geoip.lookup(clientIp);

  const responseData = {
    ipv4: clientIp,
    ipv6: ipv6Address,
    location: geo ? `${geo.city}, ${geo.region}, ${geo.country}` : "Unknown",
  };

  res.json(responseData);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
