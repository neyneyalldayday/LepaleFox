const router =  require('express').Router();
const { Comment, User } = require('../../models');
const { apiGuard } = require('../../utils/authGuard')

router.post('/:id', apiGuard, async (req, res) => {
    try {
      
      const newComment = await Comment.create({
        ...req.body,
        postId: req.params.id,
        userId: req.session.user_id,
      });
      console.log(newComment)
      res.json(newComment);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });


  router.get('/', async (req, res) => {
    try {
      const allComments = await Comment.findAll({
        include: [
          {
            model: User, 
            attributes: ["username"]
          }
        ]
      })
      res.status(200).json(allComments)
    } catch (err) {
      console.error(err);
      res.status(500).json(err)
      
    }
  })



module.exports = router;