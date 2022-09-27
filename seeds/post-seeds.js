const { Post } = require('../models');

const postData = [
    {
        title: "Coding",
        content: "Coding is Amazing",
        user_id: 1
    },
    {
        title: "The Real Deal",
        content: "This blog is the real deal",
        user_id: 2
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;