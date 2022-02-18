const Service = require('egg').Service;

class HomeService extends Service {
  async addVis(uid) {
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    return user;
  }
}

module.exports = HomeService;