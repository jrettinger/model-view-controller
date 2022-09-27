const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("../model/user");

const Blog = sequelize.define("blogs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
});

Blog.belongsTo(User, { foreignKey: "userId" });
module.exports = Blog;
