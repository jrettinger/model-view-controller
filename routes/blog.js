const express = require("express");
const router = express.Router();
const Blog = require("../model/blog");
const moment = require("moment");
const User = require("../model/user");
const Comment = require("../model/comment");

// CREATE POST AND SAVE TO DB
router.post("/create", async function (req, res) {
  try {
    await Blog.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId,
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

//GET BLOG DETAIL BY ID
router.get("/blog-detail/:id", async function (req, res) {
  try {
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

// DASHBOARD PAGE ROUTE
router.get("/dashboard", async function (req, res) {
  // CHECK USER IS LOGIN OR NOT
  if (!req.session.userId) {
    res.redirect("/login");
    return false;
  }

  try {
    const result = await Blog.findAll({
      where: { userId: req.session.userId },
      include: [
        {
          model: User,
          key: User.userId,
          attributes: ["username"],
        },
      ],
    });

    let bloglist = [];

    result.forEach((obj, ind) => {
      bloglist.push({
        id: obj.id,
        title: obj.title,
        content: obj.content,
        postedby: obj.user.username,
        date: moment(obj.createdAt).format("MM/D/YYYY"),
      });
    });
    res.render("dashboard", { bloglist });
  } catch (error) {
    console.log(error);
  }
});

// UPDATE POST PAGE
router.get("/updatepost/:id", async function (req, res) {
  // CHECK USER IS LOGIN OR NOT
  if (!req.session.userId) {
    res.redirect("/login");
    return false;
  }

  const blogDetail = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: User,
        key: User.userId,
        attributes: ["username"],
      },
    ],
  });
  res.render("updatepost", {
    id: blogDetail.id,
    title: blogDetail.title,
    content: blogDetail.content,
  });
});

// UPDATE POST
router.post("/update/:id", async function (req, res) {
  try {
    await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// DELETE POST AND RELATED COMMENTS
router.post("/delete/:id", async function (req, res) {
  try {
    await Comment.destroy({ where: { blogId: req.params.id } });
    await Blog.destroy({ where: { id: req.params.id } });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
