const bodyParser = require('koa-bodyparser');
const graph = require('fbgraph');
const jwt = require("jsonwebtoken");

let token = jwt.sign({
    username: "fackbook-twitter-lite-nickzym"
}, process.env.SECRET_KEY);
graph.setAccessToken(token);

exports.getFacebookData = async function(ctx, next){
    var options = {
        timeout:  3000
      , pool:     { maxSockets:  Infinity }
      , headers:  { connection:  "keep-alive" }
    };
    graph.setOptions(options)
    .get("zuck", function(err, res) {
      console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
    });
}
