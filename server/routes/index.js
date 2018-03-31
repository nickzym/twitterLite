const router = require("koa-router")();
const user_router = require("./user_router");
const twitte_router = require("./twitte_router");

router.use('/api/user', user_router.routes(), user_router.allowedMethods());
router.use('/api/twitte', twitte_router.routes(), twitte_router.allowedMethods());

module.exports = router;
