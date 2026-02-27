const ConvertDate = require("../utils/dateConverter");
const DbUtils = require("../utils/dbUtils");

module.exports = class NotifyRepository {
  constructor(dbContext) {
    this.sqlManager = dbContext;
  }

  async sendInstantly() {}

  async createNotification(user_id, content, header, types, direct) {
    let notifyRes;
    try {
      await this.sqlManager.beginTransaction();
      const notifyQuery = `INSERT INTO notification(user_id,content,header,created_at,is_available,direct) VALUES(${user_id},'${content}','${header}','${ConvertDate.convertToSQLTime(
        new Date(Date.now())
      )}',${false},${direct ? direct : null})`;
      notifyRes = await this.sqlManager.queryToPromis(notifyQuery);
      if (notifyRes.err) {
        throw new Error(notifyRes.err);
      }
      for (let i = 0; i < types.length; i++) {
        const notiTypeQuery = `INSERT INTO notification_type_notification(type_notify_id,notify_id) VALUES(${types[i]},${notifyRes.result.insertId})`;
        const notiTypeRes = await this.sqlManager.queryToPromis(notiTypeQuery);
        if (notiTypeRes.err) {
          throw new Error(notiTypeRes.err);
        }
      }
      await this.sqlManager.commit();
    } catch (error) {
      await this.sqlManager.rollBack();
      throw error;
    }
    return await this.getNotificationById(notifyRes.result.insertId);
  }

  async getNotificationById(n_id) {
    const query = `SELECT * FROM notification WHERE id = ${n_id}`;
    const joinQuery = `SELECT id,name FROM notification_type_notification  
                            JOIN notification_type ON type_notify_id = id 
                            WHERE notify_id = ${n_id}`;
    const res = await this.sqlManager.queryToPromis(query);
    const joinRes = await this.sqlManager.queryToPromis(joinQuery);
    return {
      id: res.result[0].id,
      user_id: res.result[0].user_id,
      content: res.result[0].content,
      header: res.result[0].header,
      is_read: res.result[0].is_read,
      created_at: res.result[0].created_at,
      read_at: res.result[0].read_at,
      types: joinRes.result,
      direct: res.result[0].direct,
    };
  }

  async getUserNotifications(user_id, itemsPerPage, pageNumber) {
    const query = `SELECT id FROM notification
    WHERE is_available = true AND  (direct = ${user_id} OR direct IS NULL)
    ORDER BY created_at DESC
    ${DbUtils.asPagination(pageNumber, itemsPerPage)}
     `;
    const res = await this.sqlManager.queryToPromis(query);
    const list = [];
    for (let i = 0; i < res.result.length; i++) {
      const notification = await this.getNotificationById(res.result[i].id);
      notification.isMy = !!notification.direct;
      notification.direct = undefined;
      notification.user_id = undefined;
      list.push(notification);
    }
    return {
      list: list,
      totalCount: res.result.length,
    };
  }

  async getAllNotifications(itemsPerPage, pageNumber) {
    const query = `SELECT id,is_available,direct FROM notification
    ORDER BY created_at DESC
     ${DbUtils.asPagination(pageNumber, itemsPerPage)}
     `;
    const totalCountQ = `SELECT COUNT(*) AS count_ FROM notification`;
    const countRes = await this.sqlManager.queryToPromis(totalCountQ);
    const res = await this.sqlManager.queryToPromis(query);
    const list = [];
    for (let i = 0; i < res.result.length; i++) {
      const notification = await this.getNotificationById(res.result[i].id);
      notification.is_available = res.result[i].is_available;
      notification.direct = res.result[i].direct;
      list.push(notification);
    }
    return { list, totalCount: countRes.result[0].count_ };
  }

  async makeReaded(id) {
    const query = `UPDATE notification SET read_at = '${ConvertDate.convertToSQLTime(
      new Date(Date.now())
    )}' WHERE id = ${id} AND direct IS NOT NULL`;
    const res = await this.sqlManager.queryToPromis(query);
  }

  async makeAvailable(id) {
    const query = `UPDATE notification SET is_available = true WHERE id = ${id}`;
    const res = await this.sqlManager.queryToPromis(query);
  }

  
};
