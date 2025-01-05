const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postLogin = async ({ req, res }) => {
  const { password, email } = req.body;
  try {
    const checkCredenttial = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkCredenttial)
      return res.status(401).json({ message: "Login failed" });

    if (checkCredenttial.role != "customer")
      return res.status(401).json({ message: "Just customer can enter" });

    const checkPassword = await bcrypt.compare(
      password,
      checkCredenttial.password
    );

    if (!checkPassword) return res.status(403).json({ message: "Gagal login" });

    const token = await jwt.sign(checkCredenttial, process.env.JWT_KEY, {
      expiresIn: "28d",
    });
    return res.status(200).json({
      message: "Login sukses",
      result: {
        token,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

module.exports = {
  postLogin,
};
