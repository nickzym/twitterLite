const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/twitterLite", {
    keepAlive: true,
});

module.exports.User = require("./user");
module.exports.Twitte = require("./twitte");
module.exports.Comment = require("./comment");
