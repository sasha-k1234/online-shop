const wrap = (fn) => {
  return async function (req, res, next) {
    try {
      await req.services.dbContext.beginTransaction();
      await fn(req, res, next);
      await req.services.dbContext.commit();
    } catch (err) {
      await req.services.dbContext.rollBack();
      console.log(err);
      res.status(500).send({});
    }
    next();
  };
  
};

module.exports = wrap;
