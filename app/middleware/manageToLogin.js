
module.exports = () => {
    return async function manageToLogin(ctx, next) {
        const arr =ctx.header.cookie?ctx.header.cookie.split('='):[]
        let code = await ctx.app.userOverTime(ctx, arr[0])
        if (code === 1) {
            await next();
        } else {
            return ctx.body = {
                code: 2000,
                result: "用户未登录",
            };
        }
    };
};