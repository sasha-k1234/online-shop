exports.createOrder = async (req, res, next) => {
  try {
    const orderRepository = req.services.orderRepository;
    const cartRepository = req.services.cartRepository;
    const products = await cartRepository.getCart(req.userId);
    const order = await orderRepository.createOrder(
      req.body.destination,
      req.userId,
      products
    );
    res.status(200).send(order);
    next();
  } catch (error) {

    res.status(500).send({});
  }
};

exports.getOrders = async (req, res, next) => {
  try {
   const statuses = ['created','accepted','delivering','delivered','recieved','cancelled','rejected','returned'];
    const orderRepository = req.services.orderRepository;
    const itemsPerPage = req.query.itemsPerPage;
    const pageNumber = req.query.page;
    const allOrders = await orderRepository.getAllOrders(
      req.userId,
      itemsPerPage,
      pageNumber
    );
    const allOrdersCount = await orderRepository.countAllOrders(req.userId);

    
    res.status(200).send({
      list: allOrders,
      totalCount: allOrdersCount,
    });
    next();
  } catch (error) {

    res.status(500).send(error);
  }
};

exports.getStatuses = async (req,res,next) => {
  const statuses = ['created','accepted','delivering','delivered','recieved','cancelled','rejected','returned'];
  res.status(200).send(statuses);
  next();
};
