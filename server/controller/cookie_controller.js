exports.deleteCookie = async function(ctx, next){
    console.log(ctx.cookies);
    try {
        let exp = new Date();
        exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
        ctx.cookies.set("jwtToken", '', {
            expires: exp,
        })
        console.log(ctx.cookies);
        return next();
    } catch (err) {
        ctx.body = err;
    }
}
