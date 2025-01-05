const createPagination = ({ page, total_data, per_page }) => {
  return {
    current: page,
    total_data: total_data,
    total_page: Math.ceil(total_data / per_page),
  };
};

module.exports = { createPagination };
