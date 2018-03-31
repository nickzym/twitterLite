const db = require("../models");

exports.createTwitte = async function(ctx, next){
    try {
        const isPremium = ctx.request.body.isPremium || false;
        let twitte;
        if (isPremium) {
            const { title, description, image, price, location, lat, lng, author } = ctx.request.body;
            twitte = await db.Twitte.create({
                title,
                description,
                image,
                isPremium: true,
                price,
                location,
                lat,
                lng,
                author,
            });
        } else {
            const { title, description, image, author } = ctx.request.body;
            twitte = await db.Twitte.create({
                title,
                description,
                image,
                author,
            });
        }
        let foundAuthor = await db.User.findById(ctx.request.body.author);
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
    try {
        let twittes = await db.Twitte.find()
        .sort({createAt: "desc"})
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
