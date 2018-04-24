const bodyParser = require('koa-bodyparser');
const db = require("../models");
const jwt = require("jsonwebtoken");
const { uploadFile } = require('./upload_controller');
const path = require('path');

//register a user
exports.registerUser = async (ctx, next) => {
    try {
        //create a user
        //create a token
        // process.env.__
        let field = JSON.parse(ctx.request.body.fields.field);

        let serverFilePath = path.join(__dirname, 'uploads');
        const res = await uploadFile(ctx, next, {
            fileType: 'avatar',
            path: serverFilePath
        });

        let user = await db.User.create({
            email: field.email,
            username: field.username,
            password: field.password,
            avatar: res
        });

        let {username, email, password, avatar, id } = user;
        let token = jwt.sign({
            username,
            email,
            password
        }, process.env.SECRET_KEY);
        // use server side cooke to save token
        ctx.cookies.set("jwtToken", token, {
            maxAge: 7200000,
            httpOnly: false,
            domain: process.env.PORT || 3002 === 3002 ? 'localhost' : 'www.twitte-lite-nickzym.com'
        });
        ctx.body = {
            username,
            email,
            avatar,
            id,
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

        if (!user) {
            ctx.body = {
                error: {
                    message: "Invalid username or password"
                }
            };
        }

        let {id, username, email, avatar } = user;
        let isMatch = await user.comparePassword(passwordReq);

        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                email,
                avatar
            }, process.env.SECRET_KEY);
            ctx.cookies.set("jwtToken", token, {
                maxAge: 7200000,
                httpOnly: false,
                domain: process.env.PORT || 3002 === 3002 ? 'localhost' : 'www.twitte-lite-nickzym.com'
            });
            ctx.body = {
                id,
                username,
                email,
                avatar,
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

exports.getUser = async (ctx, next) => {
    try {
        const userId = ctx.request.query.userId;
        let user = await db.User.findById(userId)
        .populate("twittes", {
            title: true,
            description: true,
            image: true,
            createAt: true
        })
        .populate({
            path: 'comments',
            select: 'text createAt',
            populate: {
                path: "twitte",
                select: 'title description author image',
                model: 'Twitte'
            }
        });

        if (!user) {
            ctx.body = {
                error: {
                    message: "No such user in our system"
                }
            };
        } else {
            ctx.body = user;
        }
    } catch (err) {
        return next({
            status: 400,
            message: 'No such user in our system'
        });
    }
}
