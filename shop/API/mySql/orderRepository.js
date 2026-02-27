module.exports = class OrderRepository {
  constructor(dbContext, productRepository, cartRepository) {
    this.sqlManager = dbContext;
    this.productRepository = productRepository;
    this.cartRepository = cartRepository;
  }

  async createOrder(destination, userId, products) {
    let now = new Date();
    const dateString = `${now.getUTCFullYear()}-${
      now.getUTCMonth() + 1
    }-${now.getUTCDay()} ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`;
    const orderQuery = `INSERT INTO store.order(destination,user_id,date,status) VALUES('${destination}',${userId},'${dateString}','created')`;
    const orderRes = await this.sqlManager.queryToPromis(orderQuery);


    const orderId = orderRes.result.insertId;
    let values = "";
    let orderItemQuery = `INSERT INTO 
    order_item(quantity,order_id,product_id) 
    VALUES `;
    for (let i = 0; i < products.length; i++) {
      values += `(${products[i].quantity},${orderId},${products[i].productId})`;
      if (i < products.length - 1) {
        values += ",";
      }
    }
    orderItemQuery += values;
    const orderItemRes = await this.sqlManager.queryToPromis(orderItemQuery);
    await this.cartRepository.clear(userId);
    return await this.getOrderById(orderId);
    // return {
    //   id:orderRes.result[0].insertId,
    //   date:orderRes.result[0].date,
    //   destination:orderRes.result[0].destination,
    //   status:orderRes.result[0].status,
    // }
  }

  async getOrderById(order_id) {
    const orderQuery = `SELECT * FROM store.order WHERE id = ${order_id}`;
    const orderItemQuery = `SELECT * FROM order_item WHERE order_id = ${order_id}`;
    const orderRes = await this.sqlManager.queryToPromis(orderQuery);
    const orderItemRes = await this.sqlManager.queryToPromis(orderItemQuery);
    const products = orderItemRes.result.map((item) => ({
      quantity: item.quantity,
      product_id: item.product_id,
      order_id: item.order_id,
    }));
    for (let i = 0; i < products.length; i++) {
      products[i].product = await this.productRepository.getProductById(
        products[i].product_id
      );
    }
    return {
      id: orderRes.result[0].id,
      date: orderRes.result[0].date,
      destination: orderRes.result[0].destination,
      status: orderRes.result[0].status,
      items: products,
    };
  }

  async getAllOrders(userId, itemsPerPage, page) {
    const allOrdersId = `SELECT id FROM store.order WHERE user_id = ${userId}
                           LIMIT ${itemsPerPage} OFFSET ${
      (page - 1) * itemsPerPage
    }`;
    const allOrdersRes = await this.sqlManager.queryToPromis(allOrdersId);
    const allOrders = [];
    for (let i = 0; i < allOrdersRes.result.length; i++) {
      allOrders.push(await this.getOrderById(allOrdersRes.result[i].id));
    }
    return allOrders;
  }

  async countAllOrders(userId){
    const query = `SELECT count(*) AS count_ FROM store.order WHERE user_id = ${userId}`;
    const res = await this.sqlManager.queryToPromis(query);

    
    return res.result[0].count_;
  }
};
