const DbUtils = require("../../utils/dbUtils");

module.exports = class SqlCreater {
  static getAllProductsQuery(params, isPagination = true, isAdmin = false) {
    let expression = `WHERE 
        is_deleted = false AND 
        product.name LIKE '%${params.keyword}%' AND product.price BETWEEN ${params.minPrice} AND ${params.maxPrice}
       `;

    if (params.categoryId > 0) {
      expression += `AND product.category_id = ${params.categoryId}`;
    }
    if (params.rating > 0) {
      expression += `AND product.ratings_sum / product.ratings_count
       BETWEEN  ${params.rating} 
       AND ${params.rating + '.99'}`;
    }

    const query = `SELECT product.id,product.price,product.name,product.description,product.ratings_sum,product.ratings_count,product.is_deleted,category.id AS category_id,category.name AS category_name,feature FROM product
            JOIN category ON category.id=product.category_id 
            ${isAdmin ? "" : expression} 
            ${
              isPagination
                ? DbUtils.asPagination(params.page, params.perPage)
                : ""
            }`;

            
    return query;
  }
};
