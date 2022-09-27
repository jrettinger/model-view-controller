const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("../model/user");
const Blog = require("../model/blog");

const Comment = sequelize.define("comments", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: "users",
            key: "id",
        },
    },
    blogId: {
        type: Sequelize.INTEGER,
        references: {
            model: "blogs",
            key: "id",
        },
    },
});

Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Blog, { foreignKey: "blogId" });

module.exports = Comment;