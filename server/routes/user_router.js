const router = require('koa-router')();
const user_controller = require("../controller/user_controller");
const koaBody = require('koa-body');

// router.get('/getUser', user_controller.getUser);
router.post('/login', user_controller.loginUser);
router.post('/signup', koaBody({multipart: true}), user_controller.registerUser);

module.exports = router;
