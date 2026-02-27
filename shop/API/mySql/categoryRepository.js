const redisCategoryKey = 'rcg';
module.exports = class CategoryRepository{
    constructor(dbContext,redis) {
        this.sqlManager = dbContext;
        this.redis = redis;
      }

      async addCategory(name) {
        const query = `INSERT INTO category(name) VALUES('${name}')`;
         await this.redis.set(redisCategoryKey,null);
        const res = await this.sqlManager.queryToPromis(query);
        return {
            id:res.result.insertId,
            name
        }
      }
    
      async getCategories() {
        const query = `SELECT * FROM category`;
        const cache = await this.redis.get(redisCategoryKey);
        if (cache) {
          return cache;
        }
        const response = await this.sqlManager.queryToPromis(query);
        await this.redis.set(redisCategoryKey,response.result);
        return response.result;
      }
}