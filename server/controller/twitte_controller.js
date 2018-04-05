const db = require("../models");
const { uploadFile } = require('./upload_controller');
const path = require('path');

exports.createTwitte = async function(ctx, next){
    try {
        let field = JSON.parse(ctx.request.body.fields.field);
        let serverFilePath = path.join(__dirname, 'uploads');
        const isPremium = field.isPremium || false;
        let twitte;
        if (isPremium) {
            const { title, description, price, location, author } = ctx.request.body;
            const res = await uploadFile(ctx, {
                fileType: 'twitte',
                path: serverFilePath
            });
            console.log(field);
            twitte = await db.Twitte.create({
                title: field.title,
                description: field.title,
                image: res,
                isPremium: true,
                price: field.price,
                location: field.location,
                author: field.author
            });
            console.log(twitte);
        } else {
            const res = await uploadFile(ctx, {
                fileType: 'twitte',
                path: serverFilePath
            });
            twitte = await db.Twitte.create({
                title: field.title,
                description: field.description,
                image: res,
                isPremium: field.isPremium || false,
                author: field.author
            });
        }
        let foundAuthor = await db.User.findById(field.author);
        foundAuthor.twittes.push(twitte.id);
        await foundAuthor.save();
        let foundTwitte = await db.Twitte.findById(twitte._id).populate("author", {
            username: true,
            avatar: true
        });
        ctx.body = foundTwitte;
        return next();
    } catch (err) {
        return next(err);
    }
};
// /api/twitte/get?twitte_id
exports.getTwitte = async function(ctx, next){
    try {
        let twitte = await db.Twitte.findById(ctx.request.query.twitte_id);
        ctx.body = twitte;
        return next();
    } catch (err) {
        return next(err);
    }
};

// /api/twitte/delete?twitte_id
exports.deleteTwitte = async function(ctx, next){
    try {
        let twitte = await db.Twitte.findById(ctx.request.query.twitte_id);
        await twitte.remove();
        ctx.body = twitte;
        return next();
    } catch (err) {
        return next(err);
    }
};

// /api/twitte/getalltwittes
exports.getAllTwittes = async function(ctx, next) {
    const start = ctx.query.start;
    const num = ctx.query.num;
    try {
        let twittes = await db.Twitte.find()
        .sort({createAt: "desc"})
        .limit(Number(num))
        .skip(num * start)
        .populate("author", {
            username: true,
            avatar: true,
        });
        ctx.body = twittes;
        return next();
    } catch (err) {
        return next(err);
    }
}

//api/twitte/comment
exports.commentTwitte = async function(ctx, next){
    try {
        const { text, author, twitte } = ctx.request.body;
        let comment = await db.Comment.create({
            text,
            author,
        });
        console.log(comment);
        let foundAuthor = await db.User.findById(author);
        foundAuthor.comments.push(comment.id);
        await foundAuthor.save();

        let foundTwitte = await db.Twitte.findById(twitte);
        foundTwitte.comments.push(comment.id);
        await foundTwitte.save();

        ctx.body = comment;
        return next(err);
    } catch (err) {
        return next(err);
    }
};
