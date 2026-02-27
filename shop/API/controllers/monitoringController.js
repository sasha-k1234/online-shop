const SqlManager = require("../mySql/sqlManager");
const redisRepo = require("../redis/redisRepository");
const good = 'Healthy';
const bad = 'Unhealthy';
exports.health = async (req, res, next) => {
  const states = [await checkDbState(), await checkRedisState()];
  const response = {};
  for (let i = 0; i < states.length; i++) {
    const fieldName = states[i].name;
    response[fieldName] = { ...states[i], name: undefined };
  }
  response.status = states.find((el) => el.status === bad)
    ? bad
    : good;
  // let obj = {value: 1};
  // obj.value = 2;
  // obj["value"] = 3
  // obj.newValue1 = 4;
  // obj['newValue2'] = 4;
  res.send(response);
};

async function checkDbState() {
  let status = good;
  let start = Date.now();
  try {
    const db = new SqlManager();
    db.connect();
    await db.queryToPromis("SELECT 1");
    db.close();
  } catch (error) {
    status = bad;

  }
  let end = Date.now();
  return {
    name: "MySQl",
    status,
    workTime: end - start,
  };
}

async function checkRedisState() {
  let status = good;
  let start = Date.now();
  try {
    const redis = new redisRepo();
    redis.connect();
    await redis.set("0", "0");
    if ((await redis.get("0")) === "0") {
    }
  } catch (error) {
    status = bad;
  }
  let end = Date.now();
  return {
    name: "Redis",
    status,
    workTime: end - start,
  };
}
