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



const db1 = new sqlite.Database("./data.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error("Error opening database:", err.message);
});

const sql1 =`CREATE TABLE IF NOT EXISTS INSTRUCTOR (
    INST_ID TEXT PRIMARY KEY,
    INST_LNAME TEXT,
    INST_FNAME TEXT,
    INST_PHONE INTEGER
)`;

db1.run(sql1, (err) => {
    if (err) {
        console.error("Error creating table:", err.message);
        return;
    }
    console.log("Table created or already exists.");
});
