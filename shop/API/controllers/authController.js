const bcrypt = require("bcrypt");
const generateRefreshToken = require("../utils/refresh");
const generateAccessToken = require("../utils/access");
const Cookies = require("cookies");


exports.registration = async (req, res, next) => {
  try {
    const userRepository = req.services.userRepository;
    
    const password = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const birth_date = req.body.birth_date;
    const uniqueUser = await userRepository.getUser(email);

    if (uniqueUser) {
      throw new Error("user already exist try another email"); //throw ;
    }

    await userRepository.addUser(email, email, password,first_name,last_name,birth_date);

    res.status(201).send({});
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res) => {
  const userRepository = req.services.userRepository;
  console.log('login');
  
  try {
    const user = await userRepository.getUser(req.body.email);
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new Error("invalid login or password");
    }
    const accessToken = await generateAccessToken(user);

    res.send({
      // accessToken: await generateAccessToken(user),
      accessToken,
      photoUrl: user.photoUrl ?? null,
      username: user.email,
      roles:user.roles
    });
    
  } catch (err) {
    console.log(err);
    
    res.status(401).send(err.message);
  }
};

// exports.refresh = async (req, res, next) => {

//   const cookieHeader = req.headers["refresh"];
//   
//   const refreshToken = cookieHeader && cookieHeader.split("=")[1];
//   if (!refreshToken) {
//     return res.status(400).send("Bad Request");
//   }
//   const user = await User.findOne({ refreshToken: refreshToken });
//   if (user && (!user.expiresIn || user.expiresIn > Date.now())) {
//     return res.send(await generateAccessToken(user));
//   }
//   res.status(400).send("Bad Request");
// };

// exports.logout = (req, res) => {
//   // res.clearCookie('refresh');
//   // res.end();

//   res.setHeader(
//     "Set-Cookie",
//     `refresh=; HttpOnly; secure;  Expires:${new Date(Date.now()).toUTCString()}`
//   );

//   res.status(200).send();
// };

// refreshTokenHandler = async (req, res) => {
//   if (!user.expiresIn || user.expiresIn < Date.now()) {
//     const nowDate = new Date();
//     const newDate = nowDate.setDate(nowDate.getDate() + 20);
//     user.expiresIn = newDate;
//     user.refreshToken = generateRefreshToken();
//     await user.save();
//   }
//   const accessToken = await generateAccessToken(user);
//   //res.cookie('refresh', user.refreshToken, {path:'/refresh',httpOnly: true, secure:true,expires:new Date(Date.now() + 900000), sameSite:"none"}).json({message: "Finished"});
//   //res.cookie('test', "test", {path:'/refresh',expires:new Date(Date.now() + 900000)});
// };
