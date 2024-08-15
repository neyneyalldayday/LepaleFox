const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./user-seed.json');
const postData = require('./post-seed.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of postData){
        await Post.create({
            ...post,
            userId: users[Math.floor(Math.random() * users.length)].id,
        });
        console.log('seeds seeeded')
    }
1  
    process.exit(0);
};

seedDatabase()