export const isIndexPage = (location) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  return location.pathname === rootPath;
};
