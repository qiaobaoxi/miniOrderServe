const Service = require('egg').Service;

class VisiterService extends Service {
  async addVisiter(info,unit,car,reason,office,officer,openId) {
    const result = await this.app.mysql.insert('visiter', { info,unit,car,reason,office,officer,openId});
    return   result.affectedRows === 1;
  }
}

module.exports = VisiterService;