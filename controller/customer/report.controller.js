const { createPagination } = require("../../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postReport = async ({ req, res, user_id }) => {
  const { title, description } = req.body;
  try {
    const result = await prisma.report.create({
      data: {
        title,
        description,
        user_id,
      },
    });
    return res.status(201).json({ message: "Succes create report", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const putReport = async ({ req, res, report_id }) => {
  const { title, description } = req.body;
  try {
    const result = await prisma.report.update({
      data: {
        title,
        description,
      },
      where: {
        id: report_id,
      },
    });
    return res.status(201).json({ message: "Succes update product", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const deleteReport = async ({ res, report_id }) => {
  try {
    const result = await prisma.report.delete({
      where: {
        id: report_id,
      },
    });
    return res.status(201).json({ message: "Succes delete category", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const getReportDetail = async ({ req, res, report_id }) => {
  try {
    const result = await prisma.report.findUnique({
      where: {
        id: report_id,
      },
      select: {
        id: true,
        created_at: true,
        description: true,
        title: true,
        status: true,
        reportFeedback: {
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });
    return res.status(201).json({ message: "Succes get report", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const getReport = async ({ req, res, user_id }) => {
  const { page = 1, per_page = 10 } = req.query;
  const skip = (page - 1) * per_page;

  try {
    const count = await prisma.report.count({ where: { user_id } });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.report.findMany({
      skip,
      take: Number(per_page),
      where: {
        user_id,
      },
      select: {
        id: true,
        created_at: true,
        description: true,
        title: true,
        status: true,
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

module.exports = {
  getReport,
  postReport,
  putReport,
  deleteReport,
  getReportDetail,
};
