const http = require("http");
const os = require("os");
const { parse } = require("querystring");

const server = http.createServer((req, res) => {
  // Extracting MAC Address
  const macAddress = getMACAddress();

  // Extracting IP Address
  const ipAddress = req.connection.remoteAddress;

  // Parsing UUID from request headers
  const uuid = req.headers["uuid"];

  // Parsing IMEI from request query parameters
  const queryData = parse(req.url.split("?")[1]);
  const imei = queryData["imei"];

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(`MAC Address: ${macAddress}\n`);
  res.write(`IP Address: ${ipAddress}\n`);
  res.write(`UUID: ${uuid || "Not available"}\n`);
  res.write(`IMEI: ${imei || "Not available"}\n`);
  res.end();
});

server.listen(3000, () => {
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
  return "Not available";
}
