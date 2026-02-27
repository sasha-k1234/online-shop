exports.postReview = async (req, res, next) => {
  try {
    
    const reviewRepository = req.services.reviewRepository;
    const product_id = req.body.product_id;

    const rate = req.body.rate;
    const text = req.body.text;
    const parent_id = req.body.parent_id;
    console.log(req.body);
    

    // if ( !parent_id && await reviewRepository.isExists(product_id, req.userId)  ) {
    //   res.status(403).send({});
    //   next();
    //   return;
    // }
    
    const review = await reviewRepository.postReview(
      product_id,
      req.userId,
      text,
      rate,
      parent_id
    );
    console.log(review);
    
    res.status(200).send(review);
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.editReview = async (req, res, next) => {
  try {
    const reviewRepository = req.services.reviewRepository;
    const review_id = req.body.review_id;
    const text = req.body.text;
    const review = await reviewRepository.editReview(review_id, text);
    res.status(200).send(review);
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const reviewRepository = req.services.reviewRepository;
    const review_id = req.params.id;
    await reviewRepository.deleteReview(review_id);
    res.status(200).send({});
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const reviewRepository = req.services.reviewRepository;
    const productId = req.params.id;
    
    let reviews = await reviewRepository.getReviews(productId,req.userId);
    console.log(reviews);
    
    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    
    res.status(500).send(error);
  }
};
