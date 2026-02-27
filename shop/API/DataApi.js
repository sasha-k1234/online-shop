const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
require("dotenv").config();
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const cartRouter = require("./routes/cartRouter");
const adminRouter = require("./routes/adminRouter");
const path = require("path");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const SqlManager = require("./mySql/sqlManager");
const categoryRouter = require("./routes/categoryRouter");
const UserRepository = require("./mySql/userRepository");
const CategoryRepository = require("./mySql/categoryRepository");
const ProductRepository = require("./mySql/products/productRepository");
const CartRepository = require("./mySql/cartRepository");
const AdminRepository = require("./mySql/adminRepository");
const OrderRepository = require(".//mySql/orderRepository");
const reviewRouter = require("./routes/reviewRouter");
const ReviewRepository = require("./mySql/reviews/reviewRepository");
const AnalyticsRepository = require("./mySql/analyticsRepository");
const analyticsRouter = require("./routes/analyticsRouter");
const fileRouter = require(".//routes/fileTestRouter");
const notiTypeRouter = require("./routes/notificationTypeRouter");
const notifyRouter = require("./routes/notificationRouter");
const cron = require("node-cron");
const ConvertDate = require("./utils/dateConverter");
const { error } = require("console");
const NotifyRepository = require("./mySql/notificationRepository");
const NotifyTypeRepository = require("./mySql/notificationTypeRepository");
const RedisRepository = require("./redis/redisRepository");
const monitoringRouter = require("./routes/monitoringRouter");
const testRouter = require("./routes/testRouter");
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const { env } = require("process");
const { json } = require("body-parser");
const JobService = require("./services/jobService");

const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100",
      labels: {
        app: "store",
        env: "develop",
      },
      json: true,
      onConnectionError: (err) => console.error(err),
    }),
  ],
};
const logger = createLogger(options);
//get
//post
//put
//delete

app.use(express.static("public"));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(fileUpload());
//app.use(cookieParser());
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

cron.schedule("0 4 * * *", JobService.updateAmazonPhotoLink);

cron.schedule("*/10 * * * *", async () => {
  //every 10th minute
  const db = new SqlManager();
  const query = `UPDATE notification SET is_available = 1 
  WHERE is_available = 0`;
  await db.queryToPromis(query);
});

app.use((req, res, next) => {
  logger.info(`request to ${req.url}`);
  next();
});

app.use("/auth", bindServices, authRouter, dispose);
app.use("/user", bindServices, userRouter, dispose);
app.use("/cart", bindServices, cartRouter, dispose);
app.use("/admin", bindServices, adminRouter, dispose);
app.use("/products", bindServices, productRouter, dispose);
app.use("/orders", bindServices, orderRouter, dispose);
app.use("/categories", bindServices, categoryRouter, dispose);
app.use("/reviews", bindServices, reviewRouter, dispose);
app.use("/analytics", bindServices, analyticsRouter, dispose);
app.use("/files", fileRouter);
app.use("/notification-types", bindServices, notiTypeRouter, dispose);
app.use("/notification", bindServices, notifyRouter, dispose);
app.use("/", monitoringRouter);
app.use("/tester", bindServices, testRouter, dispose);

function bindServices(req, res, next) {
  const dbContext = new SqlManager();
  const redis = new RedisRepository();
  const productRepository = new ProductRepository(dbContext, redis);
  const cartRepository = new CartRepository(dbContext);
  redis.connect();

  req.services = {
    redis,
    dbContext,
    userRepository: new UserRepository(dbContext, productRepository),
    categoryRepository: new CategoryRepository(dbContext, redis),
    productRepository: productRepository,
    cartRepository: cartRepository,
    adminRepository: new AdminRepository(dbContext, productRepository),
    orderRepository: new OrderRepository(
      dbContext,
      productRepository,
      cartRepository
    ),
    reviewRepository: new ReviewRepository(dbContext),
    analyticsRepository: new AnalyticsRepository(dbContext),
    notificationRepository: new NotifyRepository(dbContext),
    notificationTypeRepository: new NotifyTypeRepository(dbContext),
  };
  req.services.dbContext.connect();
  next();
}

function dispose(req, res) {
  req.services.dbContext.close();
  req.services.redis.disconnect();
}

async function start() {
  try {
    app.listen(3005);
  } catch (err) {}
}
start();
