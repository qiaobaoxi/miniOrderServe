const Controller = require('egg').Controller;
class ManagerController extends Controller {
    async managerLogin() {
        //user账户和密码验证
        const { userName, password } = this.ctx.request.body;
        try {
            if (userName === this.config.user) {
                if (this.config.user === userName && this.config.password === password) {
                    let time = new Date().getTime();
                    let name = userName;
                    this.ctx.cookies.set(name, time.toString(), {
                        maxAge: 30 * 60 * 1000,
                        httpOnly: false, // 默认就是 true
                        encrypt: true, // 加密传输
                    });
                    await this.app.redis.set(name, time);
                    this.ctx.body={
                        code:1,
                        msg:"登录成功"
                    }
                } else {
                    this.ctx.body={
                        code:0,
                        msg:"账户或密码错误"
                    }
                }
            } else {
                const account=userName;
                let user = await this.ctx.service.manager.findManager( account, password );
                if (user) {
                    let time = new Date().getTime();
                    let name = userName;
                    this.ctx.cookies.set(name, time.toString(), {
                        maxAge: 30 * 60 * 1000,
                        httpOnly: false, // 默认就是 true
                        encrypt: true, // 加密传输
                    });
                    await this.app.redis.set(name, time);
                    this.ctx.body={
                        code:1,
                        msg:"登录成功"
                    }
                } else {
                    this.ctx.body={
                        code:0,
                        msg:"账户或密码有误"
                    }
                }
            }
        } catch (error) {
            this.ctx.body={
                code:0,
                msg:error.message
            }
        }
    }
    async saveManager(){
        //用户账户和密码
        const {account,password,name}=this.ctx.request.body;
        const isUser = await this.ctx.service.manager.findManagerByAccount(account);
        console.log(isUser)
        if(!isUser){
          try {
            const result = await this.ctx.service.manager.saveManager(account,password,name);
            if(result){
                this.ctx.body={
                    code:1,
                    msg:"创建成功"
                }
            }else{
                this.ctx.body={
                    code:0,
                    msg:"创建失败"
                } 
            }
          }
          catch(error) {
            this.ctx.body={
                code:0,
                msg:error.message
            }
          }
        }else{
            this.ctx.body={
                code:0,
                msg:"用户已存在"
            }
        }
      }
      async managerList() {
        const { page, pageSize } = this.ctx.request.query;
        try {
            const results = await this.ctx.service.manager.managerList(page, pageSize);
            this.ctx.body = { code: 1, data: results };
        } catch (error) {
            this.ctx.body = { code: 0, msg: error.message }
        }
      }
}

module.exports = ManagerController;