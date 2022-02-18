const Controller = require('egg').Controller;
class VisiterController extends Controller {
    async addVisiter() {
      const { info,unit,car,reason,office,officer,openId} = this.ctx.request.body;
      let visiters=JSON.parse(info);
      for(let item of visiters){
        if(!item.name){
            return  this.ctx.body={code:0,msg:"访客姓名不能空"} 
        } 
      }
      if(!unit){
        return  this.ctx.body={code:0,msg:"采访单位不能空"} 
      }
      if(!reason){
        return  this.ctx.body={code:0,msg:"采访事由不能空"} 
      }
      try {
          const result = await this.ctx.service.visiter.addVisiter(info,unit,car,reason,office,officer,openId)
          if(result){
            this.ctx.body={code:1,msg:"提交成功"}; 
          }else{
            this.ctx.body={code:0,msg:"提交失败"}; 
          }
      } catch (error) {
          this.ctx.body={code:0,msg:error.message} 
      }
    }
  }
  
  module.exports = VisiterController;