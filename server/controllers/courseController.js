const {Course} = require("../sequelize");

const {
    EducationalProgramCourse
} = require('../sequelize');

// GET all courses
exports.getCourses = (req, res) => {
    Course.findAll().then(courses => res.json(courses));
};

// GET course by id
exports.getCourseById = (req, res) => {
    Course.findOne({
        where: {
            id: req.params.courseId
        }
    }).then(course => {
        res.status(200).json(course);
    });
};

//POST new course
exports.postCourse = (req, res) => {

    const newCourse = Course.create({
        title: req.body.title,
        description: req.body.description
    }).then(course => res.status(201).json(course))
};
