const router = require("express").Router();

const btownRoutes = require('./btown-controller');
const postRoutes = require('./post-controller');

router.use('/btown', btownRoutes);
router.use('/post', postRoutes);




module.exports = router;