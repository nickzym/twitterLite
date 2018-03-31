const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Twitte = require("./twitte");

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true},
    avatar: {type: String, default: ''},
    email: {type: String, unique: true, required: true},
    createAt: {type: Date, default: Date.now},
    isAdmin: {type: Boolean, default: false},
    twittes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Twitte'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

UserSchema.pre("save", async function(next) {
    try{
        if(!this.isModified("password")) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err){
        return next(err);
    }
};

module.exports = mongoose.model("User", UserSchema);
