const router = require('express').Router();
const { Reply } = require('../../models');
const { apiGuard } = require('../../utils/authGuard');



router.post('/:id', apiGuard, async (req,res) => {
    try {
      
        
        const newReply = await Reply.create({  
         ...req.body,
         commentId: req.params.id, 
         userId: req.session.user_id          
        });
        res.status(200).json(newReply);
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
        
    }
})






module.exports= router;