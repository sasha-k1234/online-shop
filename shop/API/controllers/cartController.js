
exports.addToCart = async (req, res) => {
  try {
    const cartRepository = req.services.cartRepository;
    if (!req.body.productId) {
      return res.status(400).send({});
    }
    const exists = await cartRepository.isProductExists(
      req.body.productId,
      req.userId
    );
    if (exists) {
      await cartRepository.incCart(req.body.productId, req.userId);
      res.status(200).send();
    } else {
      const addedProduct = await cartRepository.addToCart(
        req.body.productId,
        req.userId
      );
      res.json(addedProduct);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.getCart = async (req, res) => {
  const cartRepository =  req.services.cartRepository;
  const products = await cartRepository.getCart(req.userId);
  res.send(products);
};

exports.incCart = async (req, res) => {
  const product_id = req.params.id;
  const cartRepository = req.services.cartRepository;
  cartRepository.incCart(product_id,req.userId);
   res.json({});
};

exports.decCart = async (req, res) => {
  const id = req.params.id;
  const cartRepository = req.services.cartRepository;
  cartRepository.decCart(id,req.userId);
  res.json({});
};

exports.delCart = async (req, res) => {
  const id = req.params.id;
  const cartRepository = req.services.cartRepository;
  cartRepository.delCart(req.userId,id);
  res.json({});
};
