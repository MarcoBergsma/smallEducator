const Model = require("../sequelize");
const sequelize = Model.sequelize;

const {
    EducationalProgramCourse
} = require('../sequelize');

// GET all courses
exports.getCourses = (req, res) => {
    Model.Course.findAll().then(courses => res.json(courses));
};

// GET course by id
exports.getCourseById = (req, res) => {
    Model.Course.findOne({
        where: {
            id: req.params.courseId
        }
    }).then(course => {
        res.status(200).json(course);
    });
};

//POST new course
exports.postCourse = (req, res) => {

    const newCourse = Model.Course.create({
        title: req.body.title,
        description: req.body.description
    }).then(course => res.status(201).json(course))
};

//DELETE course
exports.deleteCourse = (req, res) => {
    console.log("Params: " + req.params.courseId);
    sequelize.query("DELETE FROM courses WHERE id = :courseId", {replacements: {courseId: req.params.courseId}, type: sequelize.QueryTypes.DELETE})
        .then(course => {
            res.status(200).json(course);
        });
};
