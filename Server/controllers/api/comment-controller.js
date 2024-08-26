const router =  require('express').Router();
const { Comment } = require('../../models');
const { apiGuard } = require('../../utils/authGuard')

router.post('/', apiGuard, async (req, res) => {
    try {
      
      const newComment = await Comment.create({
        ...req.body,
        userId: req.session.user_id,
      });
      console.log(newComment)
      res.json(newComment);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });



module.exports = router;