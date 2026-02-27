const ConvertDate = require("../../utils/dateConverter");
const redisMaxPriceKey = "rmpk";
module.exports = class ProductRepository {
  constructor(dbContext, redis) {
    this.sqlManager = dbContext;
    this.redis = redis;
  }

  async addProduct(name, price, description, category_id, features) {
    const insertQuery = this.sqlManager
      .createInsertBuilder("product")
      .add("name", name)
      .add("price", price)
      .add("description", description)
      .add("category_id", category_id)
      .add("features", features)
      .build();

    const selectQuery = `SELECT * FROM category WHERE id = `;
    const insRes = await this.sqlManager.queryToPromis(insertQuery);
    const selRes = await this.sqlManager.queryToPromis(
      selectQuery + category_id
    );
    return {
      id: insRes.result.insertId,
      name,
      price,
      description,
      category: {
        id: category_id,
        name: selRes.result[0].name,
      },
      features,
    };
  }

  async getMaxPrice() {
    const query = `SELECT MAX(product.price) AS _max FROM product`;
    const cacheValue = await this.redis.get(redisMaxPriceKey);
    if (cacheValue) {
      return cacheValue;
    }
    const res = await this.sqlManager.queryToPromis(query);
    await this.redis.set(redisMaxPriceKey, res.result[0]._max);
    return res.result[0]._max;
  }

  async getProducts(sqlQuery, isAdmin = false, user_id) {
    const response = await this.sqlManager.queryToPromis(sqlQuery);
    
    const products = response.result.map((el) => {
      return {
        id: el.id,
        price: el.price,
        name: el.name,
        description: el.description,
        rating: el.ratings_sum / el.ratings_count,
        category_id: el.category_id,
        category: {
          name: el.category_name,
          id: el.category_id,
        },
        is_deleted: el.is_deleted,
        features: el.features,
      };
    });
    for (let item of products) {
      const photoQuery = `SELECT id,url,is_main FROM photo 
                              JOIN product_photo ON photo_id=photo.id
                              WHERE product_id=${item.id}`;
      const photos = (await this.sqlManager.queryToPromis(photoQuery)).result;
      item.photos = photos;
    }

    if (isAdmin) {
      return products;
    }

    for (let i = 0; i < products.length; i++) {
      const favQuery = `SELECT count(*) AS count_ FROM favorite WHERE product_id = ${products[i].id} AND user_id = ${user_id}`;
      const res = await this.sqlManager.queryToPromis(favQuery);

      products[i].is_favorite = res.result[0].count_ > 0;
    }

    return products;
  }

  async addProductPhoto(name, photoPath, productId, expiresIn) {
    const query = `
        SELECT count(*) AS count_ FROM photo 
        JOIN product_photo ON product_photo.photo_id = photo.id
        WHERE is_main=true AND product_photo.product_id = ${productId}`;
    const res = await this.sqlManager.queryToPromis(query);

    // const photoInsertQuery = `INSERT INTO photo(name,url,is_main,expires_in) values('${name}','${photoPath}',${!res
    //   .result[0].count_},'${ConvertDate.convertToSQLTime(expiresIn)}')`;
    const photoInsertQuery = this.sqlManager
      .createInsertBuilder("photo")
      .add("name", name)
      .add("url", photoPath)
      .add("is_main", !res.result[0].count_)
      .add("expiresIn", ConvertDate.convertToSQLTime(expiresIn))
      .build();
    const insRes = await this.sqlManager.queryToPromis(photoInsertQuery);
    //const productPhotoInsert = `INSERT INTO product_photo(photo_id,product_id) VALUES(${insRes.result.insertId},${productId})`;
    const productPhotoInsert = this.sqlManager
      .createInsertBuilder("product_photo")
      .add("photo_id", insRes.result.insertId)
      .add("product_id", productId)
      .build();
    const prInsRes = await this.sqlManager.queryToPromis(productPhotoInsert);
    return {
      url: photoPath,
      is_main: !res.result[0].count_,
      id: insRes.result.insertId,
    };
  }

  async getProductById(id, user_id) {
    const query = `SELECT product.id,product.price,product.name,product.description,product.rating,product.is_deleted,category.id AS category_id,category.name AS category_name,product.feature,product.ratings_count,product.ratings_sum FROM product
        JOIN category ON category.id = product.category_id 
        WHERE product.id = ${id}`;
    const res = await this.sqlManager.queryToPromis(query);

    const r_sum = res.result[0].ratings_sum;
    const r_count = res.result[0].ratings_count;
    // const photoQuery = `SELECT id,url,is_main FROM photo
    //                           JOIN product_photo ON photo_id = photo.id
    //                           WHERE product_id = ${res.result[0].id}`;
    const photos = await this.getPhotos(id);

    //photos.result.map(()=>)
    return {
      id: res.result[0].id,
      price: res.result[0].price,
      name: res.result[0].name,
      description: res.result[0].description,
      rating: res.result[0].rating,
      category_id: res.result[0].category_id,
      category: {
        name: res.result[0].category_name,
        id: res.result[0].category_id,
      },
      is_deleted: res.result[0].is_deleted,
      photos: await this.getPhotos(id),
      rating: r_count > 0 ? r_sum / r_count : 0,
      // reviews: reviewRes.result.map((r) => ({
      //   ...r,
      //   isMy: r.user_id === user_id,
      // })),
      features: res.result[0].feature,
    };
  }

  async editProduct(id, name, price, description, category_id, features) {
    const query = `UPDATE product SET product.name = '${name}',
    product.description = '${description}',
    product.price = ${price},
    product.category_id = ${category_id},
    product.feature = '${features}'
    WHERE product.id = ${id}
    `;

    const product = await this.sqlManager.queryToPromis(query);
    return await this.getProductById(id);
  }

  async getPhotos(productId, userId) {
    const photoQuery = `SELECT id,url,is_main FROM photo 
                              JOIN product_photo ON photo_id = photo.id
                              WHERE product_id = ${productId}`;
    const photos = (await this.sqlManager.queryToPromis(photoQuery)).result;
    return photos;
  }

  async setFavoriteProduct(productId, userId) {
    const query = `INSERT INTO favorite(product_id,user_id) VALUES(${productId},${userId})`;
    const res = await this.sqlManager.queryToPromis(query);
  }

  async deleteFromFavorite(productId, userId) {
    const query = `DELETE FROM favorite WHERE user_id = ${userId} AND product_id = ${productId}`;
    await this.sqlManager.queryToPromis(query);
  }

  async getFavorites(user_id) {
    const favQuery = `SELECT * FROM favorite WHERE user_id = ${user_id}`;
    const res = await this.sqlManager.queryToPromis(favQuery);
    let productsArr = [];
    for (let i = 0; i < res.result.length; i++) {
      const product = await this.getProductById(res.result[i].product_id);
      productsArr.push(product);
    }
    return productsArr;
  }

  async incViewsCount(product_id) {
    const query = `UPDATE product SET views_count = views_count+1 WHERE id = ${product_id}`;
    const res = await this.sqlManager.queryToPromis(query);
  }

  async expiredPhotos() {}
};

// Human h1 = new Human('Tom');
// Human h2 = new Human('Bob');

// h1.print();
// h2.print();

// class Human{
//   constructor(name){
//     this.name = name;
//   }

//   print(){
//     console.log(this.name)
//   }
// }
