const express = require("express");
const useragent = require("useragent");
const crypto = require("crypto");

const app = express();

// Function to generate a unique hash for the device fingerprint
function generateDeviceFingerprint(req) {
  const userAgent = req.headers["user-agent"];
  const agent = useragent.parse(userAgent);
  const os = agent.os.family;
  const browser = agent.toAgent();
  const uniqueString = `${os}-${browser}`;
  const hash = crypto.createHash("sha256").update(uniqueString).digest("hex");
  return hash;
}

app.get("/", (req, res) => {
  const userAgent = req.headers["user-agent"];
  const agent = useragent.parse(userAgent);
  const ip = req.ip;
  const os = agent.os.family;
  const browser = agent.toAgent();
  const deviceFingerprint = generateDeviceFingerprint(req);

  console.log("User Agent:", userAgent);
  console.log("Parsed User Agent:", agent);
  console.log("OS:", os);
  console.log("Browser:", browser);

  console.log("Device Fingerprint:", deviceFingerprint);

  res.json({
    device: `${userAgent}${os}${browser}`,
    deviceFingerprint,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
