const { createPagination } = require("../../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postProduct = async ({ req, res }) => {
  const { name, description, price, product_id } = req.body;
  try {
    const result = await prisma.product.create({
      data: {
        name,
        description,
        price,
        product_id,
      },
    });
    return res.status(201).json({ message: "Succes create product", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const putProduct = async ({ req, res, product_id }) => {
  const { name, description, price } = req.body;
  try {
    const result = await prisma.product.update({
      data: {
        name,
        description,
        price,
        product_id,
      },
      where: {
        id: product_id,
      },
    });
    return res.status(201).json({ message: "Succes update product", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const deleteProduct = async ({ res, product_id }) => {
  try {
    const result = await prisma.product.delete({
      where: {
        id: product_id,
      },
    });
    return res.status(201).json({ message: "Succes delete category", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const getProductDetail = async ({ req, res, product_id }) => {
  try {
    const result = await prisma.product.findUnique({
      where: {
        id: product_id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
      },
    });
    return res.status(201).json({ message: "Succes get product", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const getProduct = async ({ req, res }) => {
  const { page = 1, per_page = 10, category_id } = req.query;
  const skip = (page - 1) * per_page;
  let filter = {};
  if (category_id) filter.category_id = category_id;

  try {
    const count = await prisma.product.count({ where: filter });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.product.findMany({
      skip,
      take: Number(per_page),
      where: filter,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Success get product", result, pagination });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

module.exports = {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  getProductDetail,
};
