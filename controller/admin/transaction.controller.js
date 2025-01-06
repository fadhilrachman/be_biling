const { createPagination } = require("../../lib/pagination");
const moment = require("moment");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const postCreateTransaction = async ({ req, res }) => {
  const { product, due_date, user, month } = req.body;

  const currentYear = moment().year();
  const finallyPayload = month.flatMap((month) =>
    product.flatMap((productId) =>
      user.map((userId) => ({
        due_date: moment({
          year: currentYear,
          month: month - 1,
          day: due_date,
        }).toDate(),
        product_id: productId,
        user_id: userId,
        is_paid: false,
      }))
    )
  );

  const result = await prisma.transaction.createMany({
    data: finallyPayload,
  });

  try {
    return res.status(201).json({
      message: "Succes create transaction",
      result,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const getTransaction = async ({ req, res }) => {
  const {
    page = 1,
    per_page = 10,
    user_id,
    product_id,
    year,
    month,
  } = req.query;

  const skip = (page - 1) * per_page;
  let filter = {};
  if (user_id) filter.user_id = user_id;
  if (product_id) filter.product_id = product_id;

  if (year) {
    const startOfYear = moment(`${year}-01-01`).startOf("year").toDate();
    const endOfYear = moment(`${year}-01-01`).endOf("year").toDate();
    filter.due_date = {
      ...(filter.due_date || {}),
      gte: startOfYear,
      lt: endOfYear,
    };
  }

  if (month && year) {
    const startOfMonth = moment(`${year}-${month}-01`, "YYYY-M")
      .startOf("month")
      .toDate();
    const endOfMonth = moment(`${year}-${month}-01`, "YYYY-M")
      .endOf("month")
      .toDate();
    filter.due_date = {
      ...(filter.due_date || {}),
      gte: startOfMonth,
      lt: endOfMonth,
    };
  }
  try {
    const count = await prisma.transaction.count({ where: filter });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.transaction.findMany({
      skip,
      take: Number(per_page),
      where: filter,
      select: {
        id: true,
        due_date: true,
        is_paid: true,
        user: {
          select: {
            id: true,
            user_name: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Success get report", result, pagination });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const putTransaction = async ({ req, res, transaction_id }) => {
  const { due_date, user_id, product_id } = req.body;
  try {
    const result = await prisma.transaction.update({
      data: {
        due_date,
        user_id,
        product_id,
      },
      where: {
        id: transaction_id,
      },
    });
    return res
      .status(201)
      .json({ message: "Succes update transaction", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const getDetailTransaction = async ({ res, transaction_id }) => {
  try {
    const result = await prisma.transaction.findUnique({
      where: {
        id: transaction_id,
      },
      select: {
        id: true,
        due_date: true,
        is_paid: true,
        user: {
          select: {
            id: true,
            user_name: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return res
      .status(201)
      .json({ message: "Succes get detail transaction", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const deleteTransaction = async ({ res, transaction_id }) => {
  try {
    const result = await prisma.transaction.delete({
      where: {
        id: transaction_id,
      },
    });
    return res
      .status(201)
      .json({ message: "Succes delete transaction", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = {
  postCreateTransaction,
  getTransaction,
  deleteTransaction,
  putTransaction,
  getDetailTransaction,
};
