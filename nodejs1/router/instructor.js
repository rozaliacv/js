
const express = require("express");
const {
    PostInstructor,
    GetInstructor,
    DeleteInstructor,
    PatchInstructor,
} = require("../controllers/instructor");
const router = express.Router();
router
    .route("/")
    .post(PostInstructor)
    .get(GetInstructor)

router
    .route("/:INST_ID")
    .delete(DeleteInstructor)
    .patch(PatchInstructor) 
    
module.exports = router;