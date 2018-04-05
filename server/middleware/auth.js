require('dotenv').load();
const jwt = require('jsonwebtoken');

//make sure a user is logged -- authentication
exports.loginRequired = async function(ctx, next) {
    try {
        const token = ctx.request.headers.authorization.split(" ")[1];
        await jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded) {
                return next();
            } else {

                ctx.body = {
                    status: 401,
                    message: "Please log in first!"
                }
            }
        });
    } catch (err) {
        ctx.body = {
            status: 401,
            message: "Please log in first!"
        }
    }
}

//make sure we get the correct user --authorization
//api/user?author_id
exports.ensureCorrectUser = async function(ctx, next) {
    try {
        const token = ctx.headers.authorization.split(" ")[1];
        await jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded && (decoded.id === ctx.request.query.author || decoded.id === ctx.request.body.author || decoded.id === JSON.parse(ctx.request.body.fields.field).author)) {
                return next();
            } else {
                ctx.body = {
                    status: 401,
                    message: "unauthorized!"
                }
            }
        })
    } catch (err) {
        ctx.body = {
            status: 401,
            message: "Unauthorized!"
        }
    }
}
