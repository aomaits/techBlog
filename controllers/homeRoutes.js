const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

//homepage route
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

//blogpost route
router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk( req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                    ]
                }
            ],
        })
        const post = postData.get({ plain: true });
        console.log(post);

        res.render('blogPost', {
            loggedIn: req.session.loggedIn,
            ...post
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

// login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('login');
});

//dashboard route
router.get('/dashboard', withAuth, async (req, res) =>{
    try {
        const postData = await Post.findAll({
            where: {user_id: req.session.user_id},
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;