const { createPagination } = require("../../lib/pagination");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postAdmin = async ({ req, res }) => {
  const { email, user_name, addres, client_notes, lat_long, phone, password } =
    req.body;
  const finallyPasword = await bcrypt.hash(password, 10);
  try {
    const result = await prisma.user.create({
      data: {
        email,
        user_name,
        addres,
        client_notes,
        lat_long,
        phone,
        password: finallyPasword,
        role: "admin",
      },
    });
    return res.status(201).json({ message: "Succes create admin", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const deleteAdmin = async ({ res, user_id }) => {
  try {
    const result = await prisma.user.delete({
      where: {
        id: user_id,
      },
    });
    return res.status(201).json({ message: "Succes delete admin", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const getAdminDetail = async ({ req, res, user_id }) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        user_name: true,
        email: true,
        is_change_password: true,
        addres: true,
        client_notes: true,
        lat_long: true,
        phone: true,
        created_at: true,
      },
    });
    return res.status(201).json({ message: "Succes get admin", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const getAdmin = async ({ req, res }) => {
  const { page = 1, per_page = 10 } = req.query;
  const skip = (page - 1) * per_page;

  try {
    const count = await prisma.user.count();
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.user.findMany({
      skip,
      take: Number(per_page),
      where: {
        role: "admin",
      },
      select: {
        id: true,
        user_name: true,
        email: true,
        is_change_password: true,
        addres: true,
        client_notes: true,
        lat_long: true,
        phone: true,
        created_at: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Success get admin", result, pagination });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

module.exports = {
  getAdmin,
  postAdmin,
  deleteAdmin,
  getAdminDetail,
};
