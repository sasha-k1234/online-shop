module.exports = class CartRepository {
  constructor(dbContext) {
    this.sqlManager = dbContext;
  }

  async addToCart(productId, userId) {
    const query = `INSERT INTO cart(product_id,user_id) VALUES(${productId},${userId})`;
    const result = await this.sqlManager.queryToPromis(query);
    return result.result.insertId;
  }

  async isProductExists(product_id, user_id) {
    const query = `SELECT count(*) AS count_ FROM cart WHERE product_id = ${product_id} AND user_id = ${user_id}`;
    const result = await this.sqlManager.queryToPromis(query);
    return result.result[0].count_ >= 1;
  }

  async incCart(product_id, user_id) {
    const query = `UPDATE cart SET quantity = quantity + 1 WHERE user_id = ${user_id} AND product_id = ${product_id}`;
    const result = await this.sqlManager.queryToPromis(query);
  }

  async decCart(product_id, user_id) {
    const query = `UPDATE cart SET quantity = quantity - 1 WHERE user_id = ${user_id} AND product_id = ${product_id}`;
    const result = await this.sqlManager.queryToPromis(query);
  }

  async getCart(user_id) {
    const query = `SELECT *,product.name,product.id AS product_id FROM cart
    JOIN product ON product.id = cart.product_id  
    LEFT JOIN product_photo ON product.id = product_photo.product_id
    LEFT JOIN photo ON product_photo.photo_id = photo.id
    WHERE ((photo.is_main IS NOT NULL AND photo.is_main = true) OR (photo.is_main IS NULL)) 
    AND cart.user_id = ${user_id}`;

    const res = await this.sqlManager.queryToPromis(query);
    
    return res.result.map((p) => ({
      quantity: p.quantity,
      productId: p.product_id,
      product: {
        name: p.name,
        description: p.description,
        price: p.price,
        id: p.product_id,
        category_id: p.category_id,
        rating: p.rating,
        photos: [
          {
            id: p.photo_id,
            url: p.url,
            is_main: p.is_main,
          },
        ],
      },
    }));
  }

  async delCart(user_id, product_id) {
    const query = `DELETE FROM cart WHERE user_id = ${user_id} AND product_id = ${product_id}`;
    const res = await this.sqlManager.queryToPromis(query);
  }

  async clear(userId) {
    const query = `DELETE FROM cart WHERE user_id = ${userId}`;
    const res = await this.sqlManager.queryToPromis(query);
  }
};
