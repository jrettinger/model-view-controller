const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\n- Database Synced -\n');
  
  await seedUsers();
    console.log('\n- Users Seeded -\n');
  
  await seedPosts();
    console.log('\n- Posts Seeded -\n');

  await seedComments();
    console.log('\n- Comments Seeded -\n');

  process.exit(0);
};

seedAll();