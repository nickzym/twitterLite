const router = require('koa-router')();
const google_controller = require("../controller/google_controller");

// prefix - /api/facebook/
router.get('/get', google_controller.getGoogleData);

module.exports = router;
