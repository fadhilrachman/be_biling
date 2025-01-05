const { createPagination } = require("../../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const patchStatusReport = async ({ req, res, report_id }) => {
  const { status } = req.body;
  try {
    const result = await prisma.report.update({
      data: {
        status,
      },
      where: {
        id: report_id,
      },
    });
    return res.status(201).json({ message: "Succes update report", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
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

const getReport = async ({ req, res }) => {
  const { page = 1, per_page = 10, user_id } = req.query;
  const skip = (page - 1) * per_page;
  let filter = {};
  if (user_id) filter.user_id = user_id;
  try {
    const count = await prisma.report.count({ where: filter });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.report.findMany({
      skip,
      take: Number(per_page),
      where: filter,
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
  patchStatusReport,
  getReportDetail,
  getReport,
};
