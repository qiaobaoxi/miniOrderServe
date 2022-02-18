const Service = require('egg').Service;

class UserService extends Service {
  async findUser(openId) {
    const result = await this.app.mysql.get('user', {openId});
    return   result;
  }
  async saveUser(avatarUrl,city,country,gender,nickName ,province,openId) {
    const result = await this.app.mysql.insert('user', {avatarUrl,city,country,gender,nickName ,province,openId});
    return   result.affectedRows === 1;
  }
  async userList(page,pageSize){
    const results = await this.app.mysql.select('user',{ 
      columns: ['id','nickName', 'avatarUrl',"status",'name'], 
      limit:  Number(pageSize), // 返回数据量
      offset: (Number(page)-1)*Number(pageSize), // 数据偏移量
    });
    const count = await this.app.mysql.query('select count(*) from user');
    return {
            result:results,
            count:count[0]['count(*)']
           }
  }
  async editUserName(id,name,status){
    console.log(id,name)
    const result = await this.app.mysql.update('user', {id,name,status});
    return  result.affectedRows === 1;
  }
  async getManager(){
    const results = await this.app.mysql.select('user',{ 
      where:{status:1},
      columns: ['id','name'], 
    });
    return {
            result:results,
           }
  }
}

module.exports = UserService;