exports.test = (req, res, next) => {
  throw new Error('test error');
  res.status(200).send({});
  next();
};
