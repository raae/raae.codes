const crypto = require("crypto");

export default async function corsHandler(req, res) {
  const ipHashWithSalt = crypto
    .createHash("sha256")
    .update(req.ip + process.env.ipSalt)
    .digest("hex");

  res.json({ ip: req.ip, hash: ipHashWithSalt });
}
