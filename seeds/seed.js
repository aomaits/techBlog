const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const commentData = require('./commentData.json');
const postData = require('./postData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    try {
        const seedPosts =  await Post.bulkCreate(postData);
    
        const seedComments = await Comment.bulkCreate(commentData);
    } catch (error) {
        console.log(error)
    }


    process.exit(0);
};

seedDatabase();