const router = require('koa-router')();
const twitte_controller = require("../controller/twitte_controller");
const { loginRequired, ensureCorrectUser } = require("../middleware/auth");
const koaBody = require('koa-body');

// prefix - /api/twitte/
router.post('/create', koaBody({multipart: true}), loginRequired, ensureCorrectUser, twitte_controller.createTwitte);
router.get('/get', loginRequired, ensureCorrectUser, twitte_controller.getTwitte);
router.delete('/delete', loginRequired, ensureCorrectUser, twitte_controller.deleteTwitte);
router.get('/getalltwittes', twitte_controller.getAllTwittes);
router.post('/comment', loginRequired, ensureCorrectUser, twitte_controller.commentTwitte);

module.exports = router;
