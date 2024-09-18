const express = require("express");
const {
    PostEnrollment,
    GetEnrollment,
    DeleteEnrollment,
    PatchEnrollment,
} = require("../controllers/enrollment");
const router = express.Router();
router
    .route("/")
    .post(PostEnrollment)
    .get(GetEnrollment)

router
    .route("/:STUD_NO")
    .delete(DeleteEnrollment)
    .patch(PatchEnrollment) 
    
module.exports = router;