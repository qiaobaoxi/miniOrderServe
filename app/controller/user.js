const Controller = require('egg').Controller;
class UserController extends Controller {
    async saveUser() {
        const { avatarUrl, city, country, gender, nickName, province, openId } = this.ctx.request.body.userInfo;
        try {
            const result = await this.ctx.service.user.saveUser(avatarUrl, city, country, gender, nickName, province, openId)
            if (result) {
                this.ctx.body = { code: 1, msg: "提交成功" };
            } else {
                this.ctx.body = { code: 0, msg: "提交失败" };
            }
        } catch (error) {
            this.ctx.body = { code: 0, msg: error.message }
        }
    }
    async userList() {
        const { page, pageSize } = this.ctx.request.query;
        try {
            const results = await this.ctx.service.user.userList(page, pageSize);
            this.ctx.body = { code: 1, data: results };
        } catch (error) {
            this.ctx.body = { code: 0, msg: error.message }
        }
    }
    async editUserName() {
        const { id, name,status } = this.ctx.request.body;
        try {
            const result = await this.ctx.service.user.editUserName(id, name,status);
            if (result) {
                this.ctx.body = { code: 1, msg: "修改成功" };
            } else {
                this.ctx.body = { code: 0, msg: "修改失败" };
            }
        } catch (error) {
            this.ctx.body = { code: 0, msg: error.message }
        }
    }
    async getManager() {
        try {
            const results = await this.ctx.service.user.getManager();
            this.ctx.body = { code: 1, data: results };
        } catch (error) {
            this.ctx.body = { code: 0, msg: error.message }
        }
    }
}

module.exports = UserController;