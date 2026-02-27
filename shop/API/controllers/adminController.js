// exports.adminPage = async (req, res) => {
//   const user = (await User.find({ _id: req.userId }))[0];

//   if (user.role === "admin") {

//     const users = await User.find();

//     res.json(users);
//     return;
//   }
//   res.status(403).send("Forbidden");
// };
const jobService = require("../services/jobService");

exports.allProducts = async (req, res, next) => {
  try {
    const productRepository = req.services.productRepository;
    const itemsPerPage = req.query.itemsPerPage;
    const pageNumber = req.query.page;
    const allProducts = await productRepository.getProducts(
      itemsPerPage,
      pageNumber,
      true
    );
    const allPrCount = await productRepository.countAllProducts(true);
    res.send({
      list: allProducts,
      totalCount: allPrCount,
    });
    next();
  } catch (err) {
    res.status(500).send({});
  }
};

exports.activateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const adminRepository = req.services.adminRepository;
    await adminRepository.activateProduct(id);
  } catch (err) {
    res.status(400).send({});
  }
};

exports.getAllNotifications = async (req, res, next) => {
  try {
    const notificationRepository = req.services.notificationRepository;
    const perPage = req.query.perPage;
    const pageNumber = req.query.page;
    const notifications = await notificationRepository.getAllNotifications(
      perPage,
      pageNumber
    );
    res.status(200).send(notifications);
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const page = req.query.page;
    const perPage = req.query.perPage;
    const terms = req.query.terms;
    const adminRepository = req.services.adminRepository;
    const users = await adminRepository.getUsers(page, perPage, terms);
    res.status(200).send(users);
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.makeAvailable = async (req, res, next) => {
  try {
    const id = req.params.id;
    const notificationRepository = req.services.notificationRepository;
    await notificationRepository.makeAvailable(id);
    res.status(200).send({});
    next();
  } catch (error) {
    res.status(500).send();
  }
};

exports.updatePhotos = async (req, res, next) => {
  try {
    await jobService.updateAmazonPhotoLink();
    res.status(200).send({});
    next();
  } catch (error) {
    res.status(500).send();
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const params = req.query;
    const adminRepository = req.services.adminRepository;
    const orders = await adminRepository.getOrders(params);
    res.status(200).send(orders);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

exports.changeStatus = async (req, res, next) => {
  const status = req.params.status;
  const orderId = req.params.id;
  const adminRepo = req.services.adminRepository;
  const notificationRepo = req.services.notificationRepository;
  const userId = await adminRepo.getUserByOrderId(orderId);
  await adminRepo.changeOrderStatus(orderId, status);
  await notificationRepo.createNotification(
    req.userId,
    `Your order ${orderId} has been ${status}`,
    "Your Order...",
    [1],
    userId
  );
  res.status(200).send({});
};
