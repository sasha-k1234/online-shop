const DbUtils = require("../../utils/dbUtils");

module.exports = class SqlCreater {
  static getAllReviews(productId, parentId) {
    const query = `SELECT 
	  review.id, 
    review.product_id,
    review.user_id, 
    review.text,
    review.rate,
    review.date,
    p.url as user_photo_url,
    user.username 
FROM review
JOIN user ON review.user_id = user.id
left join
	(select * from user_photo 
    left JOIN photo ON photo.id = user_photo.photo_id 
    where photo.is_main) as p
    on review.user_id = p.user_id
WHERE  review.product_id = ${productId} AND (review.parent_id ${
      parentId ? "=" : "IS"
    } ${parentId})
ORDER BY date DESC`;
    return query;
  }
};
