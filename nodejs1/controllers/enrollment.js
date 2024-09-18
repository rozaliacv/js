const Student = require("../models/table");
let sql4;

async function PostEnrollment(req, res) {

    const { STUD_NO, SECTION_ID, GRADE, TIME_OFFERED } = req.body;
    const db = req.db;
    sql4 = 'INSERT INTO ENROLLMENT (STUD_NO, SECTION_ID ,GRADE,TIME_OFFERED ) VALUES (?, ?, ?, ?)';

    db.run(sql4, [STUD_NO, SECTION_ID, GRADE, TIME_OFFERED], function (err) {
        if (err) {
            return res.status(400).json({ status: 300, success: false, error: err.message });
        }
        return res.status(201).json({ status: 200, success: true });
    });

}

async function GetEnrollment(req, res) {
    const { STUD_NO, SECTION_ID, GRADE, TIME_OFFERED } = await req.body;
    const db = req.db;
    sql4 = "SELECT * FROM ENROLLMENT";
    db.all(sql4, [STUD_NO, SECTION_ID, GRADE, TIME_OFFERED], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ status: 300, success: false, error: 'No records found' });
        }

        return res.status(200).json({ status: 200, STUDENT: rows, success: true });
    });
}

async function DeleteEnrollment(req, res) {
    const { STUD_NO } = req.params;
    const db = req.db;
    sql4 = 'DELETE FROM ENROLLMENT WHERE STUD_NO =?';
    db.run(sql4, [STUD_NO], (err) => {
        if (err) {

            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
}

async function PatchEnrollment(req, res) {
    const { STUD_NO, SECTION_ID, GRADE, TIME_OFFERED } = (req.params.COURSE_CODE, req.body);
    const db = req.db;
    sql4 = 'UPDATE ENROLLMENT SET STUD_NO = ? ,SECTION_ID= ? , GRADE = ? ,TIME_OFFERED = ? ';
    db.run(sql4, [STUD_NO, SECTION_ID, GRADE, TIME_OFFERED], (err) => {
        if (err) {

            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
}

module.exports = {
    PostEnrollment,
    GetEnrollment,
    DeleteEnrollment,
    PatchEnrollment,
}