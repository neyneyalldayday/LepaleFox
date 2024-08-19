const router = require("express").Router();

const btownRoutes = require('./btown-controller');
const postRoutes = require('./post-controller');
const commentRoutes = require('./comment-controller');
const replyRoutes = require('./reply-controller');

router.use('/btown', btownRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/reply', replyRoutes);




module.exports = router;