const Student = require("../models/table");

let sql2;

async function PostCourse(req, res) {

    const { COURSE_CODE, COURSE_TITLE, COURSE_HOURS } = req.body;
    const db = req.db;
    sql2 = 'INSERT INTO COURSE (COURSE_CODE , COURSE_TITLE , COURSE_HOURS ) VALUES (?, ?, ? )';

    db.run(sql2, [COURSE_CODE, COURSE_TITLE, COURSE_HOURS], function (err) {
        if (err) {
            return res.status(400).json({ status: 300, success: false, error: err.message });
        }
        return res.status(201).json({ status: 200, success: true });
    });

}

async function GetCourse(req, res) {
    const { COURSE_CODE, COURSE_TITLE, COURSE_HOURS } = await req.body;
    const db = req.db;
    sql2 = "SELECT * FROM COURSE";
    db.all(sql2, [COURSE_CODE, COURSE_TITLE, COURSE_HOURS], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ status: 300, success: false, error: 'No records found' });
        }

        return res.status(200).json({ status: 200, STUDENT: rows, success: true });
    });
}

async function DeleteCourse(req, res) {
    const { COURSE_CODE } = req.params;
    sql2 = 'DELETE FROM COURSE WHERE COURSE_CODE =?';
    const db = req.db;
    db.run(sql2, [COURSE_CODE], (err) => {
        if (err) {

            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
}

async function PatchCourse(req, res) {
    const { COURSE_CODE, COURSE_TITLE, COURSE_HOURS } = (req.params.COURSE_CODE, req.body);
    const db = req.db;
    sql2 = 'UPDATE COURSE SET COURSE_CODE = ? ,COURSE_TITLE = ?  ,COURSE_HOURS = ?  ';
    db.run(sql2, [COURSE_CODE, COURSE_TITLE, COURSE_HOURS], (err) => {
        if (err) {

            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
}

module.exports = {
    PostCourse,
    GetCourse,
    DeleteCourse,
    PatchCourse,
}