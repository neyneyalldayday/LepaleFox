const router = require("express").Router();

const apiRoutes = require('./api/')


router.use("/api", apiRoutes);


router.use('/' , (req, res) => {
    res.sendFile('<h1>Working on it</h1>')
})

module.exports = router;