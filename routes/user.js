const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");


// REGISTER USER AND SAVE TO DB
router.post("/register", async function (req, res) {
    try {
        // HASH THE PASSWORD
        const hash_password = await bcrypt.hash(req.body.password, 10);

        await User.create({
            username: req.body.username,
            password: hash_password,
        });
        res.redirect("/login");
    } catch (error) {
        res.render("register", { error_msg: error.errors[0].message });
    }
});

// LOGIN USER AND CREATE SESSION
router.post("/login", async function (req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (user) {

            // DECRYPT PASSWORD AND MATCH
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                sess = req.session;
                sess.username = user.username;
                sess.userId = user.id;
                res.redirect("/");
            } else {
                res.render("login", { error_msg: 'Invalid detail' });
            }
        } else {
            res.render("login", { error_msg: 'Invalid detail' });
        }
    } catch (error) {
        res.render("login", { error_msg: error.errors[0].message });
    }
});


// LOGUT USER BY DESTROYING SESSION
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
});


module.exports = router;