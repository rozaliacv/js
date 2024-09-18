const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./data.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error("Error opening database:", err.message);
});

const sql = `CREATE TABLE IF NOT EXISTS STUDENT (
    STUD_NO INTEGER PRIMARY KEY,
    STUD_LNAME TEXT,
    STUD_FNAME TEXT,
    ADDRESS TEXT,
    CITY TEXT,
    STATE TEXT,
    PINCODE TEXT
)`;

db.run(sql, (err) => {
    if (err) {
        console.error("Error creating table:", err.message);
        return;
    }
    console.log("Table created or already exists.");
});



const sql1 =`CREATE TABLE IF NOT EXISTS INSTRUCTOR (
    INST_ID TEXT PRIMARY KEY,
    INST_LNAME TEXT,
    INST_FNAME TEXT,
    INST_PHONE INTEGER
)`;

db.run(sql1, (err) => {
    if (err) {
        console.error("Error creating table:", err.message);
        return;
    }
    console.log("Table created or already exists.");
});

const sql2 =`CREATE TABLE IF NOT EXISTS COURSE(
    COURSE_CODE TEXT PRIMARY KEY, 
    COURSE_TITLE TEXT, 
    COURSE_HOURS INTEGER
    )`;

db.run(sql2, (err) => {
    if (err) {
        console.error("Error creating table:", err.message);
        return;
    }
    console.log("Table created or already exists.");
});

const sql3 =`CREATE TABLE IF NOT EXISTS SECTION( 
    SECTION_ID TEXT,
    TIME_OFFERED TEXT, 
    DAYS_OFFERED TEXT,
    SECTION_ROOM TEXT , 
    CLASS_SIZE INTEGER CHECK (CLASS_SIZE >= 0), 
    NUMBER_ENROLLED INTEGER CHECK (NUMBER_ENROLLED >= 0), 
    INSTRUCTOR_ID TEXT, 
    COURSE_CODE TEXT, 
    PRIMARY KEY(SECTION_ID,TIME_OFFERED),
    FOREIGN KEY(INST_ID) REFERENCES INSTRUCTOR(INST_ID),
    FOREIGN KEY(COURSE_CODE) REFERENCES COURSE(COURSE_CODE)
    )`;
    
db.run(sql3, (err) => {
    if (err) {
        console.error("Error creating table:", err.message);
        return;
    }
    console.log("Table created or already exists.");
});

const sql4 =`CREATE TABLE IF NOT EXISTS ENROLLMENT(
    STUD_NO TEXT,  
    SECTION_ID TEXT , 
    GRADE TEXT, 
    TIME_OFFERED TEXT, 
    PRIMARY KEY(STUD_NO , SECTION_ID), 
    FOREIGN KEY(STUD_NO) REFERENCES STUDENT(STUD_NO),
    FOREIGN KEY(SECTION_ID,TIME_OFFERED) REFERENCES SECTION(SECTION_ID,TIME_OFFERED)
    )`;
    
db.run(sql4, (err) => {
    if (err) {
        console.error("Error creating table:", err.message);
        return;
    }
    console.log("Table created or already exists.");
});