const DbUtils = require("../utils/dbUtils");
const { asPagination } = require("../utils/dbUtils");

module.exports = class AdminRepository {
  constructor(dbContext, productRepository) {
    this.sqlManager = dbContext;
    this.productRepository = productRepository;
  }

  async deleteProduct(product_id) {
    const query = `UPDATE product SET is_deleted = true WHERE id = ${product_id}`;
    const res = await this.sqlManager.queryToPromis(query);
  }

  async activateProduct(product_id) {
    const query = `UPDATE product SET is_deleted = false WHERE id = ${product_id}`;
    const res = await this.sqlManager.queryToPromis(query);
  }

  async getUsers(page, perPage, terms) {
    const where = `WHERE first_name LIKE '%${terms}%' 
    OR last_name LIKE  '%${terms}%' 
    OR email LIKE '%${terms}%'
    OR username LIKE '%${terms}%'`;

    const query = `SELECT email,user.id,first_name,last_name,url,username 
    FROM user 
    LEFT JOIN user_photo ON user_id = user.id
    LEFT JOIN photo ON photo.id = photo_id
   ${where}
   ${DbUtils.asPagination(page, perPage)}`;
    const countQuery = `SELECT COUNT(*) AS count_ FROM user ${where}`;
    const totalCount = await this.sqlManager.queryToPromis(countQuery);
    const res = await this.sqlManager.queryToPromis(query);
    return {
      list: res.result,
      totalCount: totalCount.result[0].count_,
    };
  }

  async getOrders(params) {
    const allOrdersQuery = `SELECT *,order.id ,user.username FROM store.order 
     JOIN user ON user.id = order.user_id
     ORDER BY order.date 
     ${DbUtils.asPagination(params.page, params.perPage)}
                     `;

    const allOrdersRes = await this.sqlManager.queryToPromis(allOrdersQuery);

    for (let i = 0; i < allOrdersRes.result.length; i++) {
      const orderItemQuery = `SELECT * FROM order_item WHERE order_id = ${allOrdersRes.result[i].id}`;
      const orderItemRes = await this.sqlManager.queryToPromis(orderItemQuery);
      allOrdersRes.result[i].items = orderItemRes.result;
      for (let i = 0; i < orderItemRes.result.length; i++) {
        orderItemRes.result[i].product =
          await this.productRepository.getProductById(
            orderItemRes.result[i].product_id
          );
      }
    }
    const totalCount = `SELECT count(*) as count_ FROM store.order`;

    return {
      list: allOrdersRes.result,
      totalCount: (await this.sqlManager.queryToPromis(totalCount)).result[0]
        .count_,
    };
  }

  async changeOrderStatus(id, status) {
    const query = `UPDATE store.order SET status = '${status}' 
    WHERE order.id = ${id}`;
    const res = await this.sqlManager.queryToPromis(query);
  }

  async getUserByOrderId(id) {
    const query = ` SELECT user_id FROM store.order WHERE id = ${id} `;
    const res = await this.sqlManager.queryToPromis(query);
    return res.result[0].user_id;
  }
};
