const express = require("express");
const router = express.Router();
const Blog = require("../model/blog");
const moment = require("moment");
const Comment = require("../model/comment");
const User = require("../model/user");

//GET BLOG DETAIL AND ITS COMMENT BY BLOGID
router.post("/blog-detail/:id", async function (req, res) {
  try {
    await Comment.create({
      comment: req.body.comment,
      userId: req.session.userId,
      blogId: req.params.id,
    });

    const blogDetail = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          key: User.userId,
          attributes: ["username"],
        },
      ],
    });

    const comment = await Comment.findAll({
      where: { blogId: req.params.id },
      include: [
        {
          model: User,
          key: User.userId,
          attributes: ["username"],
        },
      ],
    });

    let commentList = [];

    comment.forEach((obj, ind) => {
      commentList.push({
        id: obj.id,
        comment: obj.comment,
        commentedby: obj.user.username,
        date: moment(obj.createdAt).format("MM/D/YYYY"),
      });
    });

    res.render("blogDetail", {
      id: blogDetail.id,
      title: blogDetail.title,
      content: blogDetail.content,
      postedby: blogDetail.user.username,
      date: moment(blogDetail.createdAt).format("MM/D/YYYY"),
      commentList: commentList.reverse(),
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
