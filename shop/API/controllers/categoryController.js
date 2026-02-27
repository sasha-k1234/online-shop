exports.allCategories = async (req, res) => {
  try {
    const categoryRepository = req.services.categoryRepository;
    const allCategories = await categoryRepository.getCategories();
    res.send(allCategories);
  } catch (err) {
    
  }
};

exports.addCategory = async (req, res) => {
  try {
    const categoryRepository = req.services.categoryRepository;
    const category = await categoryRepository.addCategory(req.body.category);
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
