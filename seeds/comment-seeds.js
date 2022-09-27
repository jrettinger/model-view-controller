const Comment = require("../model/comment");

const commentData = [
  {
    comment: "This is a comment",
    userId: 1,
    blogId: 1,
  },
  {
    comment: "This is another comment",
    userId: 2,
    blogId: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
