module.exports = class DbUtils {
  static asPagination(pageNumber, perPage) {
    return `LIMIT ${perPage}  
     OFFSET ${(pageNumber - 1) * perPage}`;
  }
};
