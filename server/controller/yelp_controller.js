const bodyParser = require('koa-bodyparser');
const yelp = require('yelp-fusion');

exports.getYelpData = async function(ctx, next){
    const client = yelp.client(process.env.YELP_KEY);
    const location = ctx.request.query.location;
    let res = {};
    await client.search({
        radius: 2000,
        location: location
    })
    .then(response => {
        res = response.jsonBody;
    })
    .catch(e => {
        console.log(e);
    })

    ctx.body = res;
}
