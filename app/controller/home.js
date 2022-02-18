'use strict';
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');
var WXBizDataCrypt = require('../unit/WXBizDataCrypt');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async login() {
    //manager账户和密码验证
    const {userName,password}=this.ctx.request.body;
    if(this.config.user===userName&&this.config.password===password){
      let time=new Date().getTime();
      let name=userName;
      this.ctx.cookies.set(name,time.toString(), {
        maxAge: 30 * 60 * 1000,
        httpOnly: false, // 默认就是 true
        encrypt: true, // 加密传输
      });
      await this.app.redis.set(name, time);
      this.success()
    }else{
      this.fail({msg:"账户或密码错误"});
    }
  }
  async upload() {
    const stream = await this.ctx.getFileStream();
    const target = path.join(this.config.baseDir, 'app/public/image', stream.filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    this.ctx.body = { url: '/public/image/' + stream.filename };
  }
  async userInfoByCode() {
    let {code} = this.ctx.request.body
    const result=await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${this.config.appid}&secret=${this.config.secret}&js_code=${code}&grant_type=authorization_code`, {
      dataType: 'json',
    });
    const user = await this.ctx.service.user.findUser(result.data.openid)
    if(user){
      this.ctx.body={
        code:1,
        msg:"已经授权过信息",
        data:{openId:result.data.openid}
      } 
    }else{
      this.ctx.body={
        code:0,
        msg:"未授权",
        data:{openId:result.data.openid}
      } 
    }
  }
  
}

module.exports = HomeController;