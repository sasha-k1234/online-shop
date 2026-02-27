const bcrypt = require("bcrypt");
const e = require("express");

exports.userPage = async (req, res, next) => {
  try {
    const userRepository = req.services.userRepository;
    const user = await userRepository.getUserData(req.params.username);
    res.status(200).send(user);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({});
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const username = req.body.username;
    const userRepository = req.services.userRepository;
    if (req.body.new_password && req.body.current_password) {
      await changePassword(
        userRepository,
        email,
        req.body.current_password,
        req.body.new_password
      );
    }
    res
      .status(200)
      .send(
        await userRepository.editUser(
          req.userId,
          first_name,
          last_name,
          email,
          username
        )
      );
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

async function changePassword(repo, email, current_password, new_password) {
  try {
    const user = await repo.checkUser(email);
    if (user && bcrypt.compare(current_password, user.password)) {
      const hash = await bcrypt.hash(new_password, 10);
      await repo.changePassword(user.id, hash);
    }
  } catch (err) {

  }
}

exports.addProfilePhoto = async (req, res, next) => {
  try {
    const photoPath = getPhotoPath(req.files.file);
    const userRepository = req.services.userRepository;
    const photo = await userRepository.addProfilePhoto(req.userId, photoPath);
    res.status(200).send(photo);
    next();
  } catch (err) {

    res.status(500).send({});
  }
};

exports.changeIsMain = async (req, res, next) => {
  try {
    const photoId = req.params.id;
    const userRepository = req.services.userRepository;
    await userRepository.setAsMainPhoto(photoId, req.userId);
    res.status(200).send({});
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({});
  }
};

exports.deletePhoto = async (req, res, next) => {
  try {
    const userRepository = req.services.userRepository;
    const id = req.params.id;
    await userRepository.deleteFromGallery(id);
    res.status(200).send({});
    next();
  } catch (error) {

    res.status(500).send({});
  }
};

const getPhotoPath = (file) => {
  const dot = file.name.indexOf(".");
  let name = file.name.substr(0, dot);
  const now = new Date();
  name += `${now.getDay()}.${now.getMonth()}.${now.getFullYear()} ${now.getUTCHours()} ${now.getMinutes()} ${now.getSeconds()} ${now.getMilliseconds()}`;
  const format = file.name.substr(dot);
  const photoUrl = "public/images/users/" + name + format;
  file.mv(photoUrl);
  return photoUrl.replace("public/", "");
};

// exports.upload = async (req, res) => {
//   if (!req.files) {
//     return res.sendStatus(401);
//   }
//   const dot = req.files.photo.name.indexOf(".");
//   const format = req.files.photo.name.substr(dot);
//   const photoUrl = "public/images/" + req.userId + format;
//   req.files.photo.mv(photoUrl);
//   const user = await User.findById(req.userId);
//   user.photoUrl = photoUrl;
//   await user.save();
//   res.status(200).send({ URL: photoUrl });
// };
