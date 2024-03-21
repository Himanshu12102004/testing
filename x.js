const express = require("express");
const app = express();
const Fingerprint = require("express-fingerprint");

app.use(
  Fingerprint({
    parameters: [
      Fingerprint.useragent,
      Fingerprint.acceptHeaders,
      Fingerprint.geoip,
    ],
  })
);

app.get("*", function (req, res, next) {
  // Fingerprint object
  console.log(req.fingerprint);
  res.json({ res3: req.fingerprint });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
