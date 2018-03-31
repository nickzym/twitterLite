const bodyParser = require('koa-bodyparser');
const db = require("../models");
const jwt = require("jsonwebtoken");

//register a user
exports.registerUser = async (ctx, next) => {
    try {
        //create a user
        //create a token
        // process.env.__
        let user = await db.User.create(ctx.request.body);
        let {id, username, email, profileImageUrl } = user;
        let token = jwt.sign({
            id,
            username,
            email,
            profileImageUrl
        }, process.env.SECRET_KEY);
        ctx.body = {
            id,
            username,
            email,
            profileImageUrl,
            token
        };
    } catch (err) {
        // if a validation fails!
        if(err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken!";
        }

        // throw err;
        ctx.body = {
            error: {
                message: err.message || 'Somthing went wrong!!'
            }
        };

        return next({
          status: 400,
          message: err.message
        });
    }
}

//login a user
exports.loginUser = async (ctx, next) => {
    //finding a user
    //check if their password matched what was sent to the server
    //if it all matches
    //log them in
    try {
        const usernameReq = ctx.request.body.username;
        const passwordReq = ctx.request.body.password;

        let user = await db.User.findOne({
            username: usernameReq
        });

        let {id, username, email, profileImageUrl } = user;
        let isMatch = await user.comparePassword(passwordReq);

        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                email,
                profileImageUrl
            }, process.env.SECRET_KEY);
            ctx.body = {
                id,
                username,
                email,
                profileImageUrl,
                token
            };
        } else {
            ctx.body = {
                error: {
                    message: "Invalid username or password"
                }
            };
        }
    } catch (err) {
        return next({
          status: 400,
          message: 'Invalid username or password'
        });
    }
};
