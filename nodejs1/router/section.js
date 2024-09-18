
const express = require("express");
const {
    PostSection,
    GetSection,
    DeleteSection,
    PatchSection,
} = require("../controllers/section");
const router = express.Router();
router
    .route("/")
    .post(PostSection)
    .get(GetSection)

router
    .route("/:SECTION_ID")
    .delete(DeleteSection)
    .patch(PatchSection) 
    
module.exports = router;