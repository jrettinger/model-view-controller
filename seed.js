const seedBlogs = require("./seeds/blog-seeds");
const seedUsers = require("./seeds/user-seeds");
const seedComments = require("./seeds/comments-seeds");

const sequelize = require("./db/connection");
const seedAll = async () => {
  // await sequelize.sync({ force: true });
  // console.log("\n---Database Synced---\n");

  await seedUsers();
  console.log("\n---User Seeded---\n");

  await seedBlogs();
  console.log("\n---Blog Seeded---\n");

  await seedComments();
  console.log("\n---Comment Seeded---\n");
};

seedAll();
