module.exports = class AnalyticsRepository {
  constructor(dbContext) {
    this.sqlManager = dbContext;
  }

  async countByCategory() {
    const query = `SELECT category.name,COUNT(product.category_id) AS count FROM product
    JOIN category ON product.category_id =category.id
    GROUP BY product.category_id`;
    const res = await this.sqlManager.queryToPromis(query);
    return res.result;
  }

  async getMostViewed(amount) {
    const query = `SELECT id,name,views_count FROM product 
                  ORDER BY views_count DESC
                  LIMIT ${amount}`;
    const res = await this.sqlManager.queryToPromis(query);
    return res.result;
  }
};
