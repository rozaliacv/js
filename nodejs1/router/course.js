const express = require("express");
const {
    PostCourse,
    GetCourse,
    DeleteCourse,
    PatchCourse
} = require("../controllers/course");
const router = express.Router();
router
    .route("/")
    .post(PostCourse)
    .get(GetCourse)

router
    .route("/:COURSE_CODE")
    .delete(DeleteCourse)
    .patch(PatchCourse) 
    
module.exports = router;