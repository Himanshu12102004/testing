const express = require("express");
const os = require("os");

const app = express();

// Middleware to extract MAC Address
app.use((req, res, next) => {
  req.macAddress = getMACAddress();
  next();
});

// Middleware to log request IP
app.use((req, res, next) => {
  console.log(`Request from IP: ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  const ipAddress = req.ip;
  const macAddress = req.macAddress || "Not available";
  const uuid = req.headers["uuid"] || "Not available";
  const imei = req.query.imei || "Not available";

  res.send(
    `MAC Address: ${macAddress}\nIP Address: ${ipAddress}\nUUID: ${uuid}\nIMEI: ${imei}`
  );
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

function getMACAddress() {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    const iface = interfaces[key];
    const mac = iface.find(
      (details) => !details.internal && details.mac !== "00:00:00:00:00:00"
    );
    if (mac) return mac.mac;
  }
  return null;
}
