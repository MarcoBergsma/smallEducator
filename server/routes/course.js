const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", courseController.getCourses);

router.get("/:courseId", courseController.getCourseById);

router.post("/", courseController.postCourse);

router.delete("/delete/:courseId", courseController.deleteCourse);

module.exports = router;
