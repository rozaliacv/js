const sqlite = require("sqlite3").verbose();

const db  = new sqlite.Database("./data.db" ,sqlite.OPEN_READWRITE, (err) => {
    if(err)return console.error(err);
    db.run("PRAGMA foreign_keys = ON", (err) => {
        if (err) {
            console.error("Error enabling foreign keys:", err.message);
        } else {
            console.log("Foreign keys are enabled.");
        }
    });
});

module.exports = db;