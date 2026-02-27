exports.createNotification = async (req, res, next) => {
  try {
    let notifications = [];
    const notificationRepository = req.services.notificationRepository;
    if (req.body.directs.length > 0) {
      for (let i = 0; i < req.body.directs.length; i++) {
        notifications.push(
          await notificationRepository.createNotification(
            req.userId,
            req.body.content,
            req.body.header,
            req.body.types,
            req.body.directs[i]
          )
        );
      }
    } else {
      notifications.push(
        await notificationRepository.createNotification(
          req.userId,
          req.body.content,
          req.body.header,
          req.body.types
        )
      );
    }
    
    res.status(201).send(notifications);
    next();
  } catch (error) {

    res.status(500).send(error);
  }
};

exports.getNotificationById = async (req, res, next) => {
  try {
    const notificationRepository = req.services.notificationRepository;
    const notification = await notificationRepository.getNotificationById(
      req.params.id
    );
    res.status(200).send(notification);
    next();
  } catch (error) {

    
    res.status(500).send(error);
  }
};

exports.getUserNotifications = async (req, res, next) => {
  try {
    
    const notificationRepository = req.services.notificationRepository;
    const itemsPerPage = req.query.itemsPerPage;
    const pageNumber = req.query.page;
    const notifications = await notificationRepository.getUserNotifications(req.userId,
      itemsPerPage,
      pageNumber
    );
    res.status(200).send(notifications);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.makeReaded = async (req,res,next) => {
try {
  const notificationRepository = req.services.notificationRepository;
  const id = req.params.id;
  await notificationRepository.makeReaded(id);
  res.status(200).send({});
  next();
} catch (error) {

  res.status(500).send(error)
}
};
