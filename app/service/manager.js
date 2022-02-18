const Service = require('egg').Service;

class ManagerService extends Service {
  async saveManager(account,password,name) {
    const result = await this.app.mysql.insert('manager', { account,password,name});
    return   result.affectedRows === 1;
  }
  async findManagerByAccount(account) {
    const result = await this.app.mysql.get('manager', { account});
    console.log(account,result)
    return   result;
  }
  async findManager(account,password) {
    const result = await this.app.mysql.get('manager', { account,password});
    return   result;
  }
  async managerList(page,pageSize){
    const results = await this.app.mysql.select('manager',{ 
      columns: ['id','name', "account"], 
      limit:  Number(pageSize), // 返回数据量
      offset: (Number(page)-1)*Number(pageSize), // 数据偏移量
    });
    const count = await this.app.mysql.query('select count(*) from manager');
    return {
            result:results,
            count:count[0]['count(*)']
           }
  }
}

module.exports = ManagerService;