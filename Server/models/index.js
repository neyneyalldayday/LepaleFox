const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')
const Reply = require('./Reply')
const Photo = require('./Photo')
const Fan = require('./Fan')



Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});


Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
});

Post.hasMany(Photo, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
})


Comment.belongsTo(Fan, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});


Comment.hasMany(Reply, {
    foreignKey: 'commentId',
    onDelete: 'CASCADE',
});



Reply.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
})

Photo.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})




module.exports = { User, Post, Comment, Reply, Photo, Fan }