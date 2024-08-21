const router = require("express").Router();
const {User} = require('../../models');


router.post('/createme', async (req, res)=> {
try {
    const createBtown = await User.create(req.body);

    req.session.save(() => {
        req.session.user_id = createBtown.id;
        req.session.username = createBtown.username;
        req.session.logged_in = true;
  
        res.status(200).json({createBtown, message:"You are now logged in!"});
      });
} catch (err) {
    console.error(err);
    res.status(500).json(err)
}
});


router.post('/letmein', async (req, res)=> {
    try {
      const letInBtown = await User.findOne({
        where: {username: req.body.username},
      })

      if (!letInBtown) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }

      const validPass = await letInBtown.checkPassword(req.body.password);

      if (!validPass){
        res.status(400).json({message: 'incorrect user daddy'});
        return;
      }


      req.session.save(() => {
        req.session.user_id = letInBtown.id;
        req.session.username = letInBtown.username;
        req.session.logged_in = true;
  
        res.status(200).json({
          letInBtown,
          message: 'You are now logged in!',
        });
      });
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
        
    }
})


router.post('/letmeout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


  router.get('/allofme', async (req, res)=> {
    try {
        const heyYou = await User.findAll();
        res.status(200).json(heyYou)
    } catch (err) {
        res.status(500).json(err)
        
    }
  });


  router.get("/oneofme", async (req,res) => {
    if (!req.session.logged_in) {
      res.status(403).json({ msg: 'you must login to perform this action' });      
    } else {
      res.json(true);
    }
  })



module.exports = router;