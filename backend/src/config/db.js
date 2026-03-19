const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.resolve(process.cwd(), process.env.SQLITE_DB_PATH || "./database/smartnest.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("SQLite connection error:", err.message);
  } else {
    console.log("SQLite connected successfully");
  }
});

module.exports = db;