const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const ipv6Address = req.socket.remoteAddress;
  res.send(`Your IPv6 address: ${ipv6Address}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
