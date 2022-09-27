const express = require("express");
const router = express.Router();
const Blog = require("../model/blog");
const User = require("../model/user");
const moment = require('moment');


// HOME PAGE ROUTE
router.get("/", async function (req, res) {
    try {
        const result = await Blog.findAll({
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
                date: moment(obj.createdAt).format('MM/D/YYYY'),
            })
        });

        res.render("home", { bloglist });
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;