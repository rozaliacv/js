const Student = require("../models/table");
let sql1;
async function PostInstructor(req, res) {

    const { INST_ID, INST_LNAME, INST_FNAME, INST_PHONE } = req.body;
    const db = req.db;
    sql1 = 'INSERT INTO INSTRUCTOR (INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE ) VALUES (?, ?, ?, ? )';

    db.run(sql1, [INST_ID, INST_LNAME, INST_FNAME, INST_PHONE], function (err) {
        if (err) {
            return res.status(400).json({ status: 300, success: false, error: err.message });
        }
        return res.status(201).json({ status: 200, success: true });
    });

}

async function GetInstructor(req, res) {
    const { INST_ID, INST_LNAME, INST_FNAME, INST_PHONE } = await req.body;
    const db = req.db;
    sql1 = "SELECT * FROM INSTRUCTOR";
    db.all(sql1, [INST_ID, INST_LNAME, INST_FNAME, INST_PHONE], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ status: 300, success: false, error: 'No records found' });
        }

        return res.status(200).json({ status: 200, STUDENT: rows, success: true });
    });
}

async function DeleteInstructor(req, res) {
    const { INST_ID } = req.params;
    const db = req.db;
    sql1 = 'DELETE FROM INSTRUCTOR WHERE INST_ID=?';
    db.run(sql1, [INST_ID], (err) => {
        if (err) {

            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
}

async function PatchInstructor(req, res) {
    const { INST_ID, INST_LNAME, INST_FNAME, INST_PHONE } = (req.params.INST_ID, req.body);
    const db = req.db;
    sql1 = 'UPDATE INSTRUCTOR SET INST_ID = ? ,INST_LNAME = ?  ,INST_FNAME = ?  ,INST_PHONE = ? ';
    db.run(sql1, [INST_ID, INST_LNAME, INST_FNAME, INST_PHONE], (err) => {
        if (err) {

            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
}

module.exports = {
    PostInstructor,
    GetInstructor,
    DeleteInstructor,
    PatchInstructor,
}