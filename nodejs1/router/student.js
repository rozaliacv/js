const express = require("express");
const {
    PostStudent,
    GetStudent,
    DeleteStudent,
    PatchStudent
} = require("../controllers/student");
const router = express.Router();
router
    .route("/")
    .post(PostStudent)
    .get(GetStudent)

router
    .route("/:STUD_NO")
    .delete(DeleteStudent)
    .patch(PatchStudent) 
    
module.exports = router;