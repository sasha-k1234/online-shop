module.exports = class NotifyTypeRepository {
  constructor(dbContext) {
    this.sqlManager = dbContext;
  }

  async addNotificationType(name) {
    const query = `INSERT INTO notification_type(name) VALUES('${name}')`;
    const res = await this.sqlManager.queryToPromis(query);
    return {
      id: res.result.insertId,
      name,
    };
  }

  async getNotificationTypeById(id) {
    const query = `SELECT * FROM notification_type WHERE id = ${id}`;
    const res = await this.sqlManager.queryToPromis(query);
    return res.result[0];
  }

  async editNotificationType(id, name) {
    const query = `UPDATE notification_type SET name = '${name}' WHERE id = ${id}`;
    const res = await this.sqlManager.queryToPromis(query);
    return {
      id,
      name,
    };
  }

  async deleteNotificationType(id){
    const query = `DELETE FROM notification_type WHERE id = ${id}`;
    const res = await this.sqlManager.queryToPromis(query);
  }

  async getTypes(){
    const query = `SELECT * FROM notification_type`;
    const res = await this.sqlManager.queryToPromis(query);
    return res.result;
  }
};
