const mongoose = require('mongoose');
const User = require("./user");
const db = require("../models");

const twitteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: String,
    isPremium: {type: Boolean, default: false},
    price: String,
    location: String,
    lat: Number,
    lng: Number,
    createAt: {type: Date, default: Date.now},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

twitteSchema.pre('remove', async function(next){
    //find a user
    //remove the id of the message from their twitte list
    //save the user
    //return next
    try {
        let user = await db.User.findById(this.author);
        user.twittes.remove(this.id);
        await user.save();

        //this.comments = removeable twitte's comments
        // first traverse all the comments of this removeable twitte
        // second find the comment's author
        // third delete that comment's from that user's comment list
        // save that change
        // remove that comment at all
        this.comments.forEach(async (comment, index) => {
            let commentUser = db.User.findById(comment.author);
            await commentUser.comments.remove(comment.id);
            await commentUser.save();
            await comment.remove();
        });

        return next();
    } catch (err){
        return next(err);
    }
});

module.exports = mongoose.model('Twitte', twitteSchema);
