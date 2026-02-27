const mysql = require("mysql");
module.exports = class SqlManager {
  connection;
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "mysqlpw",
      database: "store",
      port:3306
    });
  }

  beginTransaction() {
    return new Promise((res, rej) => {
      this.connection.beginTransaction((err) => {
        if (err) {
          rej(err);
        }
      });
      res();
    });
  }

  commit() {
    return new Promise((res, rej) => {
      this.connection.commit((err) => {
        if (err) {
          rej(err);
        }
      });
      res();
    });
  }

  rollBack() {
    return new Promise((res, rej) => {
      this.connection.rollback((err) => {
        if (err) {
          rej(err);
        }
      });
      res();
    });
  }

  connect() {
    this.connection.connect();
  }

  close() {
    this.connection.end();
  }

  queryToPromis(query) {
    return new Promise((res, rej) => {
      this.connection.query(query, (err, result, fields) => {
        if (err) {
          rej(err);
        } else {
          res({
            result,
            fields,
          });
        }
      });
    });
  }

  createInsertBuilder(tableName) {
    return new InsertBuilder(tableName);
  }

  async calcCount(query){
  const res = await this.queryToPromis(`select count(*) AS count_ from (${query}) sub`);
  
  return res.result[0].count_;
  }
};

class InsertBuilder {
  keys = [];
  values = [];
  constructor(tableName) {
    this.tableName = tableName;
  }
  add(key, value) {
    if (value) {
      this.keys.push(key);
      this.values.push(typeof value === "string" ? `'${value}'` : value);
    }
    return this;
  }
  build() {
    return `INSERT INTO ${this.tableName}(${this.keys.join(
      ","
    )}) VALUES(${this.values.join(",")})`;
  }
}
