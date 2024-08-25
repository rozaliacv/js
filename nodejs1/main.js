const express = require('express');
const bodyParser = require('body-parser');
const main = express();
const sqlite = require("sqlite3").verbose();
let sql;

const db = new sqlite.Database("./data.db" ,sqlite.OPEN_READWRITE, (err) => {
    if(err)return console.error(err);
    db.run("PRAGMA foreign_keys = ON", (err) => {
        if (err) {
            console.error("Error enabling foreign keys:", err.message);
        } else {
            console.log("Foreign keys are enabled.");
        }
    });
});

main.use(bodyParser.json());

main.post('/STUDENT', async(req, res) => {
        const { STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE } = await req.body;
        sql = 'INSERT INTO STUDENT (STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE) VALUES (?, ?, ?, ?, ?, ?, ?)';

        db.run(sql, [STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE], function(err) {
            if (err) {
                return res.status(400).json({ status: 300, success: false, error: err.message });
            }

            return res.status(201).json({ status: 200, success: true });
        });

});


main.get('/STUDENT', async(req, res) => {
        const { STUD_NO, STUD_LNAME, STUD_FNAME, ADDRESS, CITY, STATE, PINCODE } = await req.body;
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


main.post('/INSTRUCTOR', async(req, res) => {
        const { INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE  } =  req.body;
        sql1 = 'INSERT INTO INSTRUCTOR (INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE ) VALUES (?, ?, ?, ? )';

        db.run(sql1, [INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE], function(err) {
            if (err) {
                return res.status(400).json({ status: 300, success: false, error: err.message });
            }
            return res.status(201).json({ status: 200, success: true });
        });

});


main.get('/INSTRUCTOR', async(req, res) => {
        const { INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE } = await req.body;
        sql1 = "SELECT * FROM INSTRUCTOR";
        db.all(sql1, [INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE], (err, rows) => {
            if (err) {
                return res.status(500).json({ status: 300, success: false, error: err.message });
            }

            if (rows.length === 0) {
                return res.status(404).json({ status: 300, success: false, error: 'No records found' });
            }

            return res.status(200).json({ status: 200, STUDENT: rows, success: true });
        });
});

main.delete('/INSTRUCTOR/:INST_ID', async(req,res) => {
    const { INST_ID} = req.params;
    sql1='DELETE FROM INSTRUCTOR WHERE INST_ID=?';
    db.run (sql1, [INST_ID], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )

main.patch('/INSTRUCTOR/:INST_ID', async(req,res) => {
    const { INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE} = (req.params.INST_ID, req.body);
    sql1='UPDATE INSTRUCTOR SET INST_ID = ? ,INST_LNAME = ?  ,INST_FNAME = ?  ,INST_PHONE = ? ';
    db.run (sql1, [INST_ID ,INST_LNAME ,INST_FNAME ,INST_PHONE], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )

let sql2;


main.post('/COURSE', async(req, res) => {
        const { COURSE_CODE , COURSE_TITLE , COURSE_HOURS } =  req.body;
        sql2 = 'INSERT INTO COURSE (COURSE_CODE , COURSE_TITLE , COURSE_HOURS ) VALUES (?, ?, ? )';

        db.run(sql2, [COURSE_CODE , COURSE_TITLE , COURSE_HOURS], function(err) {
            if (err) {
                return res.status(400).json({ status: 300, success: false, error: err.message });
            }
            return res.status(201).json({ status: 200, success: true });
        });

});


main.get('/COURSE', async(req, res) => {
        const { COURSE_CODE , COURSE_TITLE , COURSE_HOURS } = await req.body;
        sql2 = "SELECT * FROM COURSE";
        db.all(sql2, [COURSE_CODE , COURSE_TITLE , COURSE_HOURS], (err, rows) => {
            if (err) {
                return res.status(500).json({ status: 300, success: false, error: err.message });
            }

            if (rows.length === 0) {
                return res.status(404).json({ status: 300, success: false, error: 'No records found' });
            }

            return res.status(200).json({ status: 200, STUDENT: rows, success: true });
        });
});

main.delete('/COURSE/:COURSE_CODE', async(req,res) => {
    const { COURSE_CODE} = req.params;
    sql2='DELETE FROM COURSE WHERE COURSE_CODE =?';
    db.run (sql2, [COURSE_CODE], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )

main.patch('/COURSE/:COURSE_CODE', async(req,res) => {
    const { COURSE_CODE , COURSE_TITLE , COURSE_HOURS} = (req.params.COURSE_CODE, req.body);
    sql2='UPDATE COURSE SET COURSE_CODE = ? ,COURSE_TITLE = ?  ,COURSE_HOURS = ?  ';
    db.run (sql2, [COURSE_CODE , COURSE_TITLE , COURSE_HOURS], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )

let sql3;


main.post('/SECTION', async(req, res) => {
        const { SECTION_ID ,TIME_OFFERED , DAYS_OFFERED ,SECTION_ROOM  , CLASS_SIZE  , NUMBER_ENROLLED , INSTRUCTOR_ID ,  COURSE_CODE  } =  req.body;
        sql3 = 'INSERT INTO SECTION (SECTION_ID ,TIME_OFFERED , DAYS_OFFERED ,SECTION_ROOM  , CLASS_SIZE  , NUMBER_ENROLLED , INSTRUCTOR_ID ,  COURSE_CODE  ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )';

        db.run(sql3, [SECTION_ID ,TIME_OFFERED , DAYS_OFFERED ,SECTION_ROOM  , CLASS_SIZE  , NUMBER_ENROLLED , INSTRUCTOR_ID ,  COURSE_CODE  ], function(err) {
            if (err) {
                return res.status(400).json({ status: 300, success: false, error: err.message });
            }
            return res.status(201).json({ status: 200, success: true });
        });

});


main.get('/SECTION', async(req, res) => {
        const { SECTION_ID ,TIME_OFFERED , DAYS_OFFERED ,SECTION_ROOM  , CLASS_SIZE  , NUMBER_ENROLLED , INSTRUCTOR_ID ,  COURSE_CODE   } = await req.body;
        sql3 = "SELECT * FROM SECTION";
        db.all(sql3, [SECTION_ID ,TIME_OFFERED , DAYS_OFFERED ,SECTION_ROOM  , CLASS_SIZE  , NUMBER_ENROLLED , INSTRUCTOR_ID ,  COURSE_CODE  ], (err, rows) => {
            if (err) {
                return res.status(500).json({ status: 300, success: false, error: err.message });
            }

            if (rows.length === 0) {
                return res.status(404).json({ status: 300, success: false, error: 'No records found' });
            }

            return res.status(200).json({ status: 200, STUDENT: rows, success: true });
        });
});

main.delete('/SECTION/:SECTION_ID', async(req,res) => {
    const { SECTION_ID} = req.params;
    sql3='DELETE FROM SECTION WHERE SECTION_ID =?';
    db.run (sql3, [SECTION_ID], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )

main.patch('/SECTION/:SECTION_ID', async(req,res) => {
    const { SECTION_ID ,TIME_OFFERED , DAYS_OFFERED ,SECTION_ROOM  , CLASS_SIZE  , NUMBER_ENROLLED , INSTRUCTOR_ID , COURSE_CODE } = (req.params.COURSE_CODE, req.body);
    sql3 ='UPDATE SECTION SET SECTION_ID = ? ,TIME_OFFERED = ? , DAYS_OFFERED = ? ,SECTION_ROOM = ?  , CLASS_SIZE = ?  , NUMBER_ENROLLED = ? , INSTRUCTOR_ID = ? ,  COURSE_CODE = ?   ';
    db.run (sql3, [SECTION_ID ,TIME_OFFERED , DAYS_OFFERED ,SECTION_ROOM  , CLASS_SIZE  , NUMBER_ENROLLED , INSTRUCTOR_ID , COURSE_CODE], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )

let sql4;


main.post('/ENROLLMENT', async(req, res) => {
        const { STUD_NO, SECTION_ID ,GRADE,TIME_OFFERED } =  req.body;
        sql4 = 'INSERT INTO ENROLLMENT (STUD_NO, SECTION_ID ,GRADE,TIME_OFFERED ) VALUES (?, ?, ?, ?)';

        db.run(sql4, [STUD_NO, SECTION_ID ,GRADE,TIME_OFFERED], function(err) {
            if (err) {
                return res.status(400).json({ status: 300, success: false, error: err.message });
            }
            return res.status(201).json({ status: 200, success: true });
        });

});


main.get('/ENROLLMENT', async(req, res) => {
        const { STUD_NO, SECTION_ID ,GRADE,TIME_OFFERED } = await req.body;
        sql4 = "SELECT * FROM ENROLLMENT";
        db.all(sql4, [STUD_NO, SECTION_ID ,GRADE,TIME_OFFERED ], (err, rows) => {
            if (err) {
                return res.status(500).json({ status: 300, success: false, error: err.message });
            }

            if (rows.length === 0) {
                return res.status(404).json({ status: 300, success: false, error: 'No records found' });
            }

            return res.status(200).json({ status: 200, STUDENT: rows, success: true });
        });
});

main.delete('/ENROLLMENT/:STUD_NO', async(req,res) => {
    const { STUD_NO} = req.params;
    sql4='DELETE FROM ENROLLMENT WHERE STUD_NO =?';
    db.run (sql4, [STUD_NO], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )

main.patch('/ENROLLMENT/:STUD_NO', async(req,res) => {
    const { STUD_NO, SECTION_ID ,GRADE,TIME_OFFERED} = (req.params.COURSE_CODE, req.body);
    sql4 ='UPDATE ENROLLMENT SET STUD_NO = ? ,SECTION_ID= ? , GRADE = ? ,TIME_OFFERED = ? ';
    db.run (sql4, [STUD_NO, SECTION_ID ,GRADE,TIME_OFFERED], (err) => {
        if (err) {
            
            return res.status(500).json({ status: 300, success: false, error: err.message });
        }
        return res.status(200).json({ status: 200, success: true });
    });
} )


    
main.listen(3000, () => console.log('Server Started'));
