export const paginatePages = (
  currentPage: number,
  perPage: number,
  limit: number
) => {
  const numberOfPages = Math.ceil(limit / perPage);

  return {
    previousPage: currentPage == 0 ? 0 : currentPage - 1,
    currentPagePosts: [],
    nextPage: currentPage == numberOfPages ? numberOfPages : currentPage + 1,
    numberOfPages,
    posts: null,
    skipPages: perPage * (currentPage - 1),
  };
};
