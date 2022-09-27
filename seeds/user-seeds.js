const { User } = require('../models');

const userData = [
    {
        username: "jrettinger",
        email: "jason.rettinger@gmail.com",
        password: "password1"
    },
    {
        username: "mjthegoat",
        email: "mj23@gmail.com",
        password: "6rings"
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;