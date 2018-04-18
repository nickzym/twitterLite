const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

const db_url = process.env.DATABASEURL || "mongodb://localhost/twitterLite";
mongoose.connect(db_url, {
    keepAlive: true
});

module.exports.User = require("./user");
module.exports.Twitte = require("./twitte");
module.exports.Comment = require("./comment");
