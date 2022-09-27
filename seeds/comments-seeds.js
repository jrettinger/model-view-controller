const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 5,
        comment_text: "Cool Beans!"
    },
    {
        user_id: 1,
        post_id: 4,
        comment_text: "Nice!"
    },
    {
        user_id: 3,
        post_id: 5,
        comment_text: "Sweet!"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "Stupendous!"
    },
    {
        user_id: 3,
        post_id: 4,
        comment_text: "Excellent!"
    },
    {
        user_id: 5,
        post_id: 3,
        comment_text: "Thank you!"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;