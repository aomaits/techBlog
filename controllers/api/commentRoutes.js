const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

// POST method to create new comment
router.post('/blog/:post_id', withAuth, async (req, res) => {
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

// export user routes as module
module.exports = router;