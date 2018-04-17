const router = require("koa-router")();
const user_router = require("./user_router");
const twitte_router = require("./twitte_router");
const yelp_router = require("./yelp_router");
const google_router = require("./google_router");

router.use('/api/user', user_router.routes(), user_router.allowedMethods());
router.use('/api/twitte', twitte_router.routes(), twitte_router.allowedMethods());
router.use('/api/yelp', yelp_router.routes(), yelp_router.allowedMethods());
router.use('/api/google', google_router.routes(), google_router.allowedMethods());

module.exports = router;
