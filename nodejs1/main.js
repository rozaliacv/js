const express = require('express');
const bodyParser = require('body-parser');
const main = express();
const sqlite = require("sqlite3").verbose();
let sql;

const db = new sqlite.Database("./STUDENT.db" ,sqlite.OPEN_READWRITE, (err) => {
    if(err)return console.error(err);
});

main.use(bodyParser.json());

main.post('/STUDENT', async(req, res) => {
    //try {
        const { STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE } = await req.body;
        sql = 'INSERT INTO STUDENT (STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE) VALUES (?, ?, ?, ?, ?, ?, ?)';

        db.run(sql, [STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE], function(err) {
            if (err) {
                //console.error("Error inserting data:", err.message);
                return res.status(400).json({ status: 300, success: false, error: err.message });
            }

            //console.log('Successful input:', STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE);
            return res.status(201).json({ status: 200, success: true });
        });
    // } catch (error) {
    //     console.error("Unexpected error:", error.message);
    //     return res.status(500).json({ status: 400, success: false, error: error.message });
    // }
});


main.get('/STUDENT', async(req, res) => {
    
    //try {
        const { STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE } = await req.body;
        sql = "SELECT * FROM STUDENT";
        db.all(sql, [STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE], (err, rows) => {
            if (err) {
                //console.error("Error retrieving data:", err.message);
                return res.status(500).json({ status: 300, success: false, error: err.message });
            }

            if (rows.length === 0) {
                return res.status(404).json({ status: 300, success: false, error: 'No records found' });
            }

            return res.status(200).json({ status: 200, STUDENT: rows, success: true });
        });
    // } catch (error) {
    //     console.error("Unexpected error:", error.message);
    //     return res.status(500).json({ status: 400, success: false, error: error.message });
    // }
});

main.delete('/STUDENT/:STUD_NO', async(req,res) => {
    const { STUD_NO} = req.params;
    sql='DELETE FROM STUDENT WHERE STUD_NO=?';
    db.run (sql, [STUD_NO], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )

main.patch('/STUDENT/:STUD_NO', async(req,res) => {
    const { STUD_NO,STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE} = (req.params.STUD_NO, req.body);
    sql='UPDATE STUDENT SET STUD_LNAME = ?, STUD_FNAME = ?, ADDRESS = ?, CITY = ?, STATE = ?, PINCODE = ? WHERE STUD_NO=?';
    db.run (sql, [STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE,STUD_NO], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )

let sql1;
const db1 = new sqlite.Database("./INSTRUCTOR.db" ,sqlite.OPEN_READWRITE, (err) => {
    if(err)return console.error(err);
});

main.use(bodyParser.json());

main.post('/INSTRUCTOR', async(req, res) => {
    //try {
        const { INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE  } =  req.body;
        sql1 = 'INSERT INTO INSTRUCTOR (INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE ) VALUES (?, ?, ?, ? )';

        db1.run(sql1, [INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE], function(err) {
            if (err) {
                //console.error("Error inserting data:", err.message);
                return res.status(400).json({ status: 300, success: false, error: err.message });
            }

            //console.log('Successful input:', STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE);
            return res.status(201).json({ status: 200, success: true });
        });
    // } catch (error) {
    //     console.error("Unexpected error:", error.message);
    //     return res.status(500).json({ status: 400, success: false, error: error.message });
    // }
});


main.get('/INSTRUCTOR', async(req, res) => {
    
    //try {
        const { INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE } = await req.body;
        sql1 = "SELECT * FROM INSTRUCTOR";
        db1.all(sql1, [INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE], (err, rows) => {
            if (err) {
                //console.error("Error retrieving data:", err.message);
                return res.status(500).json({ status: 300, success: false, error: err.message });
            }

            if (rows.length === 0) {
                return res.status(404).json({ status: 300, success: false, error: 'No records found' });
            }

            return res.status(200).json({ status: 200, STUDENT: rows, success: true });
        });
    // } catch (error) {
    //     console.error("Unexpected error:", error.message);
    //     return res.status(500).json({ status: 400, success: false, error: error.message });
    // }
});

main.delete('/INSTRUCTOR/:INST_ID', async(req,res) => {
    const { INST_ID} = req.params;
    sql1='DELETE FROM INSTRUCTOR WHERE INST_ID=?';
    db1.run (sql1, [INST_ID], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )

main.patch('/INSTRUCTOR/:INST_ID', async(req,res) => {
    const { INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE} = (req.params.INST_ID, req.body);
    sql1='UPDATE INSTRUCTOR SET INST_ID = ? ,INST_LNAME = ?  ,INST_FNAME = ?  ,INST_PHONE = ? ';
    db1.run (sql1, [INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )



    
main.listen(3000, () => console.log('Server Started'));
