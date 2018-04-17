const router = require('koa-router')();
const yelp_controller = require("../controller/yelp_controller");

// prefix - /api/yelp/
router.get('/get', yelp_controller.getYelpData);

module.exports = router;
