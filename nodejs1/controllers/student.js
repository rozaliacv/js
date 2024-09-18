const Student = require("../models/table");
let sql;
async function PostStudent(req, res) {

    const { STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE } = await req.body;
    const db = req.db;
    sql = 'INSERT INTO STUDENT (STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.run(sql, [STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE], function (err) {
        if (err) {
            return res.status(400).json({ status: 300, success: false, error: err.message });
        }

        return res.status(201).json({ status: 200, success: true });
    });

}

async function GetStudent(req, res) {
    const { STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE } = await req.body;
    const db = req.db;
    sql = "SELECT * FROM STUDENT";
    db.all(sql, [STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ status: 300, success: false, error: 'No records found' });
        }

        return res.status(200).json({ status: 200, STUDENT: rows, success: true });
    });
}

async function DeleteStudent(req, res) {
    const { STUD_NO } = req.params;
    const db = req.db;
    sql = 'DELETE FROM STUDENT WHERE STUD_NO=?';
    db.run(sql, [STUD_NO], (err) => {
        if (err) {

            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
}

async function PatchStudent(req, res) {
    const { STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE } = (req.params.STUD_NO, req.body);
    const db = req.db;
    sql = 'UPDATE STUDENT SET STUD_LNAME = ?, STUD_FNAME = ?, ADDRESS = ?, CITY = ?, STATE = ?, PINCODE = ? WHERE STUD_NO=?';
    db.run(sql, [STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE, STUD_NO], (err) => {
        if (err) {

            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
}

module.exports = {
    PostStudent,
    GetStudent,
    DeleteStudent,
    PatchStudent,
}