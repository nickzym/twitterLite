const router = require('koa-router')();
const user_controller = require("../controller/user_controller");

// router.get('/getUser', user_controller.getUser);
router.post('/login', user_controller.loginUser);
router.post('/signup', user_controller.registerUser);

module.exports = router;
