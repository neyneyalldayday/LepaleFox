const router = require("express").Router();
const { Post } = require('../../models/');
const { apiGuard } = require('../../utils/authGuard');

router.post('/', apiGuard, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({ ...body, userId: req.session.user_id });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', apiGuard, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', apiGuard, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/checkposts',apiGuard, async (req,res)=> {
    try {
        console.log('User ID:', req.session.user_id);
       const allmyPosts = await Post.findAll({
        where: { userId: req.session.user_id }
       });
       console.log('Found Posts:', allmyPosts);
       res.status(200).json(allmyPosts); 
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
        
    }
});

router.get('/:id', async (req,res)=> {
    try {
       const focusPost = await Post.findOne({
        where: {id: req.params.id}
       });
       res.status(200).json(focusPost);
     
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
        
    }
});





module.exports = router;