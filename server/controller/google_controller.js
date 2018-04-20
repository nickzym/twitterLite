const bodyParser = require('koa-bodyparser');
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY,
    Promise: require('q').Promise
});

exports.getGoogleData = async function(ctx, next){
    const { lat, lng } = ctx.request.query;
    let place_id;
    let reference;
    let res = new Object();
    return new Promise((resolve, reject) => {
        googleMapsClient.placesNearby({
            location: [Number(lat), Number(lng)],
            rankby: 'distance'
        })
        .asPromise()
        .then(response => {
            place_id = response.json.results[0].place_id;
            reference = response.json.results[0].reference;
        })
        .then(() => {
            googleMapsClient.place({
                placeid: place_id
            })
            .asPromise()
            .then(response => {
                res = response.json.result;
                resolve(res);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
    })
    .then(res => {
        ctx.body = res;
    })
}
