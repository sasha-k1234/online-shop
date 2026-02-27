const AmazonS3 = require("../AWS/amazonS3");
const SqlManager = require("../mySql/sqlManager");
const ConvertDate = require("../utils/dateConverter");
require("dotenv").config();
class JobService {
  static async updateAmazonPhotoLink() {
    const db = new SqlManager();
    const query = `SELECT * FROM photo WHERE DATE_SUB(expires_in, INTERVAL 1 DAY) <'${ConvertDate.convertToSQLTime(
      new Date(Date.now())
    )}'`;

    // const query = `SELECT * FROM photo WHERE expires_in <'${ConvertDate.convertToSQLTime(
    //   new Date(Date.now())
    // )}'`;
    const res = await db.queryToPromis(query);
    if (res.error) {
      console.error(res.error);
    }

    const s3 = new AmazonS3();

    for (let i = 0; i < res.result.length; i++) {
      const url = await s3.getFileUrl(
        res.result[i].name,
        parseInt(process.env.AMAZON_EXPIRESIN)
      );

      await db.queryToPromis(
        `UPDATE photo SET expires_in = '${ConvertDate.convertToSQLTime(
          new Date(Date.now() + parseInt(process.env.AMAZON_EXPIRESIN))
        )}' , url = '${url}' WHERE id = ${res.result[i].id}`
      );
    }
  }
}
module.exports = JobService;
