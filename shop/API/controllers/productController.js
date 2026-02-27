const { S3Client } = require("@aws-sdk/client-s3");
const fs = require("fs");
const AmazonS3 = require("../AWS/amazonS3");
const ConvertDate = require("../utils/dateConverter");
const SqlCreater = require("../mySql/products/sqlCreater");

const getPhotoPath = (req) => {
  if (!req.files) {
    return "";
  }
  const dot = req.files.file.name.indexOf(".");
  let name = req.files.file.name.substr(0, dot);
  const now = new Date();
  name += `${now.getDay()}.${now.getMonth()}.${now.getFullYear()} ${now.getUTCHours()} ${now.getMinutes()} ${now.getSeconds()} ${now.getMilliseconds()}`;
  const format = req.files.file.name.substr(dot);
  const photoUrl = name + format;
  return photoUrl;
  // req.files.file.mv(photoUrl);
  // return photoUrl.replace("public/", "");
};

exports.addProduct = async (req, res, next) => {
  try {
    const productRepository = req.services.productRepository;
    //onsole.log(    ConvertDate.convertToSQLTime(new Date(parseInt(process.env.AMAZON_EXPIRESIN) + Date.now())));
    const product = await productRepository.addProduct(
      req.body.title,
      req.body.price,
      req.body.description,
      req.body.category_id,
      req.body.features
    );

    if (req.files?.file) {
      const s3 = new AmazonS3();
      const photoName = getPhotoPath(req);
      await s3.saveFile(photoName, req.files.file);
      const amazonUrl = await s3.getFileUrl(
        photoName,
        parseInt(process.env.AMAZON_EXPIRESIN)
      );
      const expiresIn = new Date(
        Date.now() + parseInt(process.env.AMAZON_EXPIRESIN)
      );
      const photo = await productRepository.addProductPhoto(
        photoName,
        amazonUrl,
        product.id,
        expiresIn
      );
      product.images = [photo];
    }

    //res.status(200).send(product);
    res.send(product);
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.allProducts = async (req, res, next) => {
  const productRepository = req.services.productRepository;

  const count = await req.services.dbContext.calcCount(
    SqlCreater.getAllProductsQuery(req.query, false)
  );
  const allProducts = await productRepository.getProducts(
    SqlCreater.getAllProductsQuery(req.query),
    false,
    req.userId ?? 0
  );
  res.send({
    list: allProducts,
    totalCount: count,
  });
};

exports.getMaxPrice = async (req, res, next) => {
  const productRepository = req.services.productRepository;

  const maxPrice = await productRepository.getMaxPrice();

  res.status(200).send({ maxPrice });
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const adminRepository = req.services.adminRepository;
    await adminRepository.deleteProduct(id);
    res.status(200).send();
    next();
  } catch (err) {
    return res.status(400).send({});
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user_id = req.userId;
    const productRepository = req.services.productRepository;
    const product = await productRepository.getProductById(id, user_id);
    await productRepository.incViewsCount(id);
    res.send(product);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const category_id = req.body.category_id;
    const features = req.body.features;

    const productRepository = req.services.productRepository;
    const editProduct = await productRepository.editProduct(
      id,
      name,
      price,
      description,
      category_id,
      features
    );

    res.status(200).send(editProduct);
    next();
  } catch (err) {
    res.status(500).send({});
  }
};

exports.addProductPhoto = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const photoPath = getPhotoPath(req);
    const productRepository = req.services.productRepository;
    const photo = await productRepository.addProductPhoto(photoPath, productId);
    res.status(200).send(photo);
    next();
  } catch (err) {
    res.status(500).send({});
  }
};

exports.setFavorite = async (req, res, next) => {
  try {
    const productRepository = req.services.productRepository;
    const productId = req.params.id;
    await productRepository.setFavoriteProduct(productId, req.userId);
    res.status(200).send({});
    next();
  } catch (error) {
    res.status(500).send({});
  }
};

exports.undoFavorite = async (req, res, next) => {
  try {
    const pId = req.params.id;
    const productRepository = req.services.productRepository;
    await productRepository.deleteFromFavorite(pId, req.userId);
    res.status(200).send({});
    next();
  } catch (error) {
    res.status(500).send({});
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const productRepository = req.services.productRepository;
    const favorites = await productRepository.getFavorites(req.userId);
    res.status(200).send(favorites);
    next();
  } catch (error) {
    res.status(500).send({});
  }
};
