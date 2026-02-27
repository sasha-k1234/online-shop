exports.createType = async (req, res, next) => {
  const notificationTypeRepository = req.services.notificationTypeRepository;
  const type = await notificationTypeRepository.addNotificationType(
    req.body.name
  );
  res.status(201).send(type);
  next();
};

exports.getNotificationTypeById = async (req, res, next) => {
  const notificationTypeRepository = req.services.notificationTypeRepository;
  const notification = await notificationTypeRepository.getNotificationTypeById(
    req.params.id
  );
  res.status(200).send(notification);
  next();
};

exports.editNotificationType = async (req, res, next) => {
  const notificationTypeRepository = req.services.notificationTypeRepository;
  const editedType = await notificationTypeRepository.editNotificationType(
    req.params.id,
    req.body.name
  );
  res.status(200).send(editedType);
  next();
};

exports.deleteType = async (req, res, next) => {
  const notificationTypeRepository = req.services.notificationTypeRepository;
  await notificationTypeRepository.deleteNotificationType(req.params.id);
  res.status(200).send({});
  next();
};

exports.getTypes = async (req, res, next) => {
  const notificationTypeRepository = req.services.notificationTypeRepository;
  const types = await notificationTypeRepository.getTypes();
  res.status(200).send(types);
  next();
};
