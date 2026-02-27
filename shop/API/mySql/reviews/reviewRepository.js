const SqlCreater = require("./sqlCreater");

module.exports = class ReviewRepository {
  constructor(dbContext) {
    this.sqlManager = dbContext;
  }

  async postReview(product_id, user_id, text, rate, parent_id) {
    const dateString = require("moment")().format("YYYY-MM-DD HH:mm:ss");
    await this.sqlManager.beginTransaction();
    try {
      console.log(rate);

      const query = this.sqlManager
        .createInsertBuilder("review")
        .add("text", text)
        .add("user_id", user_id)
        .add("product_id", product_id)
        .add("date", dateString);

      if (parent_id) {
        query.add("rate", rate).add("parent_id", parent_id);
      }

      if (!parent_id) {
        const updatedRating = `UPDATE product 
      SET ratings_sum = ratings_sum + ${rate},
      ratings_count = ratings_count+1 
      WHERE id = ${product_id} `;
        await this.sqlManager.queryToPromis(updatedRating);
      }

      const res = await this.sqlManager.queryToPromis(query.build());
      console.log(res.result);

      await this.sqlManager.commit();

      return {
        id: res.result.insertId,
        text: text,
        rate: rate,
        user_id: user_id,
        product_id: product_id,
        date: dateString,
      };
    } catch (error) {
      console.log(error);

      await this.sqlManager.rollBack();
    }
  }

  async isExists(product_id, user_id) {
    // await this.sqlManager.beginTransaction();
    const query = `SELECT COUNT(*) as count_ FROM review WHERE user_id = ${user_id} AND product_id = ${product_id}`;
    console.log(query);

    const res = await this.sqlManager.queryToPromis(query);
    const count = res.result[0].count_;

    return !!count;
  }

  async editReview(review_id, text) {
    // await this.sqlManager.beginTransaction();
    const query = `UPDATE review SET text = '${text}'  WHERE id = ${review_id}`;
    const getSingleReview = `SELECT 
	  review.id, 
    review.user_id, 
    review.text,
    review.rate,
    review.date,
    p.url as user_photo_url,
    user.username 
  FROM review JOIN user ON review.user_id = user.id
left join
	(select * from user_photo 
    left JOIN photo ON photo.id = user_photo.photo_id 
    where photo.is_main) as p
    on review.user_id = p.user_id
WHERE review.id = ${review_id}
ORDER BY date DESC `;
    const res = await this.sqlManager.queryToPromis(query);

    const singleRes = await this.sqlManager.queryToPromis(getSingleReview);
    return singleRes.result[0];
  }

  async deleteReview(review_id) {
    const query = `DELETE FROM review WHERE id = ${review_id}`;
    const updateParentId = `  UPDATE review SET parent_id = 
    (SELECT parent_id FROM (SELECT parent_id FROM review  WHERE id = ${review_id}) AS temp)
    WHERE review.parent_id = ${review_id}
    `;
    // const findReview = `SELECT * FROM review WHERE id = ${review_id}`;
    // const reviewRes = await this.sqlManager.queryToPromis(findReview);
    // const updateCommentParent = `UPDATE review SET parent_id = ${reviewRes.result[0].parent_id}
    // WHERE review.parent_id = ${review_id}`;
    // const updateRes = await this.sqlManager.queryToPromis(updateCommentParent);
    const updateRes = await this.sqlManager.queryToPromis(updateParentId);
    const res = await this.sqlManager.queryToPromis(query);
  }

  async getReviews(productId, userId) {
    const query = SqlCreater.getAllReviews(productId, null);
    const res = await this.sqlManager.queryToPromis(query);
    const reviewsArr = res.result;

    for (let i = 0; i < reviewsArr.length; i++) {
     await this.findChildren(productId, reviewsArr[i]);
    }

    return res.result.map((r) => ({
      ...r,
      isMy: r.user_id === userId,
    }));
  }

  async findChildren(productId, review) {
    const childQuery = SqlCreater.getAllReviews(productId, review.id);
    review.child = (await this.sqlManager.queryToPromis(childQuery)).result;
    for (let i = 0; i < review.child.length; i++) {
      await this.findChildren(productId, review.child[i]);
    }
  }
};
