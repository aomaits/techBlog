const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

// POST method to create new comment
router.post('/blog/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

// export user routes as module
module.exports = router;