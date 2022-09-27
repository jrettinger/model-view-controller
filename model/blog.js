const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");
const User = require("../model/user");


const Blog = sequelize.define("blogs", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    content: {
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
});

Blog.belongsTo(User, { foreignKey: "userId" });
module.exports = Blog;
