export const calculateOffset = (
  pageNumber: number,
  rowsPerPage: number
): number => {
  const validPageNumber = Math.max(1, Math.floor(pageNumber));
  const validRowsPerPage = Math.max(1, Math.floor(rowsPerPage));

  return (validPageNumber - 1) * validRowsPerPage;
};
