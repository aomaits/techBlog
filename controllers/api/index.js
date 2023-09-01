// import express router
const router = require('express').Router();

// import user and comment route modules
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');

// mount routes at /users and /comments paths
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

// export router
module.exports = router;