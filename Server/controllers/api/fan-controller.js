const router = require('express').Router();
const { Fan } = require("../../models");



router.post('/createfan', async (req, res) => {
try {
    const createFan = await Fan.create(req.body);

    req.session.save(() => {
        req.session.user_id = createFan.id;
        req.session.username = createFan.username;
        req.session.logged_in = true;


        res.status(200).json({createFan, message:"you are now logged in"})
    })
} catch (err) {
    console.error(err);
    res.status(500).json(err)
}
})


router.post('/letinFan', async (req, res)=> {
    try {
      const letInFan = await Fan.findOne({
        where: {username: req.body.username},
      })

      if (!letInFan) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }

      const validPass = await letInFan.checkPassword(req.body.password);

      if (!validPass){
        res.status(400).json({message: 'incorrect user daddy'});
        return;
      }


      req.session.save(() => {
        req.session.user_id = letInFan.id;
        req.session.username = letInFan.username;
        req.session.logged_in = true;
        
  
        res.status(200).json({
          letInFan,
          message: 'You are now logged in!',
        });
      });
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
        
    }
})






















module.exports = router