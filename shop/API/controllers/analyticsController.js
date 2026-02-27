
exports.countByCategory = async(req,res,next) => {
    try {
        const analyticsRepository = req.services.analyticsRepository;
        const result = await analyticsRepository.countByCategory();
        res.status(200).send(result);
        next();
    } catch (error) {

        res.status(500).send(error);
    }
};

exports.getMostViewed = async(req,res,next) => {
    try {
        const analyticsRepository = req.services.analyticsRepository;
        const result = await analyticsRepository.getMostViewed(req.query.amount);
        res.status(200).send(result);
        next();
    } catch (error) {
       res.send(error); 
    }
};