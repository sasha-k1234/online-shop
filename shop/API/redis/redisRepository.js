const { createClient } = require("redis");

class RedisRepository {
  constructor() {}
  connect() {
    try {
        this.client = createClient();
      this.client.on("error", (err) => {

        this.client.disconnect();
      });
      if (!this.client.isOpen) {
        this.client.connect();
      }
    } catch (err) {

    }
  }

  disconnect() {
    if (this.client.isOpen) {
      this.client.disconnect();
    }
  }

  async set(key, value, exp = 3600) {
    await this.client.setEx(key, exp, JSON.stringify(value));
  }

  async get(key) {
    const obj = await this.client.get(key);
    if (!obj) {
      return null;
    }
    return JSON.parse(obj);
  }
}

module.exports = RedisRepository;
