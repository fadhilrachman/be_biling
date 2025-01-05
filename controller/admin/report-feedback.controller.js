const { createPagination } = require("../../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postReportFeedback = async ({ req, res, user_id }) => {
  const { title, description, report_id } = req.body;
  try {
    const result = await prisma.reportFeedback.create({
      data: {
        title,
        description,
        user_id,
        report_id,
      },
    });

    return res
      .status(201)
      .json({ message: "Succes create report feedback", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const deleteReportFeedback = async ({ res, report_id_feedback }) => {
  try {
    const result = await prisma.reportFeedback.delete({
      where: {
        id: report_id_feedback,
      },
    });
    return res.status(201).json({ message: "Succes delete report", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = {
  postReportFeedback,
  deleteReportFeedback,
};
