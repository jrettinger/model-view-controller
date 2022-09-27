const { User } = require("../model/user");

const userData = [
  {
    username: "jrettinger",
    email: "jason.rettinger@gmail.com",
    password: "$2a$10$CxYJ3irYZ4oqrTSVe2aRj.5dkRmZiOUq9sfJmBzrSgXRc19ir41AO", // password is password
  },
  {
    username: "mjthegoat",
    email: "mj23@gmail.com",
    password: "$2a$10$CxYJ3irYZ4oqrTSVe2aRj.5dkRmZiOUq9sfJmBzrSgXRc19ir41AO", // password is password
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
