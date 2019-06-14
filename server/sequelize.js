const Sequelize = require("sequelize");
const CourseModel = require("./models/course");

const sequelize = new Sequelize("smallEducator", "root", "root", {
  host: "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Course = CourseModel(sequelize, Sequelize);

module.exports = {
  Course,
  sequelize
};
