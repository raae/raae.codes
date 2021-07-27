const crypto = require("crypto");

export default async function corsHandler(req, res) {
  try {
    const ipHashWithSalt = crypto
      .createHash("sha256")
      .update(req.ip + process.env.IP_HASH_SALT)
      .digest("hex");

    res.json({ ip: req.ip, hash: ipHashWithSalt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
