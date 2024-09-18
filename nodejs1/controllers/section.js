const Student = require("../models/table");
let sql3;
async function PostSection(req, res) {

    const { SECTION_ID, TIME_OFFERED, DAYS_OFFERED, SECTION_ROOM, CLASS_SIZE, NUMBER_ENROLLED, INSTRUCTOR_ID, COURSE_CODE } = req.body;
    const db = req.db;
    sql3 = 'INSERT INTO SECTION (SECTION_ID ,TIME_OFFERED , DAYS_OFFERED ,SECTION_ROOM  , CLASS_SIZE  , NUMBER_ENROLLED , INSTRUCTOR_ID ,  COURSE_CODE  ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )';

    db.run(sql3, [SECTION_ID, TIME_OFFERED, DAYS_OFFERED, SECTION_ROOM, CLASS_SIZE, NUMBER_ENROLLED, INSTRUCTOR_ID, COURSE_CODE], function (err) {
        if (err) {
            return res.status(400).json({ status: 300, success: false, error: err.message });
        }
        return res.status(201).json({ status: 200, success: true });
    });

}

async function GetSection(req, res) {
    const { SECTION_ID, TIME_OFFERED, DAYS_OFFERED, SECTION_ROOM, CLASS_SIZE, NUMBER_ENROLLED, INSTRUCTOR_ID, COURSE_CODE } = await req.body;
    const db = req.db;
    sql3 = "SELECT * FROM SECTION";
    db.all(sql3, [SECTION_ID, TIME_OFFERED, DAYS_OFFERED, SECTION_ROOM, CLASS_SIZE, NUMBER_ENROLLED, INSTRUCTOR_ID, COURSE_CODE], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ status: 300, success: false, error: 'No records found' });
        }

        return res.status(200).json({ status: 200, STUDENT: rows, success: true });
    });
}

async function DeleteSection(req, res) {
    const { SECTION_ID } = req.params;
    const db = req.db;
    sql3 = 'DELETE FROM SECTION WHERE SECTION_ID =?';
    db.run(sql3, [SECTION_ID], (err) => {
        if (err) {

            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
}

async function PatchSection(req, res) {
    const { SECTION_ID, TIME_OFFERED, DAYS_OFFERED, SECTION_ROOM, CLASS_SIZE, NUMBER_ENROLLED, INSTRUCTOR_ID, COURSE_CODE } = (req.params.COURSE_CODE, req.body);
    const db = req.db;
    sql3 = 'UPDATE SECTION SET SECTION_ID = ? ,TIME_OFFERED = ? , DAYS_OFFERED = ? ,SECTION_ROOM = ?  , CLASS_SIZE = ?  , NUMBER_ENROLLED = ? , INSTRUCTOR_ID = ? ,  COURSE_CODE = ?   ';
    db.run(sql3, [SECTION_ID, TIME_OFFERED, DAYS_OFFERED, SECTION_ROOM, CLASS_SIZE, NUMBER_ENROLLED, INSTRUCTOR_ID, COURSE_CODE], (err) => {
        if (err) {

            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
}

module.exports = {
    PostSection,
    GetSection,
    DeleteSection,
    PatchSection,
}