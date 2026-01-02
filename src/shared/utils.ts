export const buildPaginatedResponse = ({
  data,
  pageSize,
  pageNumber,
  total,
}) => {
  return {
    data,
    pageSize,
    pageNumber,
    total,
  };
};
