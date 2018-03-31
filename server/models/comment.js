const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
    text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Comment", commentSchema);
