const router = require('koa-router')();
const facebook_controller = require("../controller/facebook_controller");

// prefix - /api/facebook/
router.get('/get', facebook_controller.getFacebookData);

module.exports = router;
