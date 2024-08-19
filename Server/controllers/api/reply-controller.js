const router = require('express').Router();
const {Comment, Reply} = require('../../models');
const { apiGuard } = require('../../utils/authGuard');



router.post('/', apiGuard, async (req,res) => {
    try {
        const { commentId, replyBody } = req.body;

        if (!commentId || !replyBody){
            return res.status(400).json({error: 'need the comment id and the content for the reply'})
        }

        const newReply = await Reply.create({
            commentId,
            userId: req.session.user_id,
            body: replyBody,
        });
        res.status(200).json(newReply);
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
        
    }
})






module.exports= router;