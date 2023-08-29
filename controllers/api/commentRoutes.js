const router = require('express').Router();
const Comment = require('../../models/Comment');

// POST method to create new comment
router.post('/blog/:post_id', async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content,
            post_id: req.params.post_id,
            user_id: req.session.user_id,
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err.message);
    }
});
