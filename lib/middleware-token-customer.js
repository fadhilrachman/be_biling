const jwt = require("jsonwebtoken");

// Middleware untuk verifikasi token
const verifyTokenCustomer = (req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.header("Authorization");
  console.log("MIDDLEWARE USER");

  // Jika token tidak ada, kirim respons 401 Unauthorized
  console.log({ token });

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  // Hapus prefix "Bearer " jika ada
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  // Verifikasi token
  jwt.verify(
    tokenWithoutBearer,
    "aksjcoacsnoq,31sdasdasd.3",
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }
      console.log({ decoded });
      if (decoded?.role != "customer")
        return res.status(403).json({ message: "Invalid or expired token." });

      req.user = decoded;
      next(); // Lanjutkan ke handler berikutnya
    }
  );
};

module.exports = verifyTokenCustomer;
