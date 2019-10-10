var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  }else{
    console.log('Connected to the SQLite database.')
    db.run(
      `CREATE TABLE student_status (
          status TEXT PRIMARY KEY,
          description TEXT null)`,
      (err) => {
        if (err) {
          console.error(err.message)
        } else{
          // Table just created, creating some rows
          var insert = 'INSERT INTO student_status (status, description) VALUES (?,?)'
          db.run(insert, ["active", "active"])
          db.run(insert, ["delinquent", "delinquent"])
          db.run(insert, ["dropped", "dropped"])
        }
      });
    db.run(
      `CREATE TABLE student (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT not null, 
          last_name TEXT not null, 
          phone_number INTEGER, 
          status TEXT not null,
          FOREIGN KEY (status) 
             REFERENCES student_status (status))`,
      (err) => {
        if (err) {
          console.error(err.message)
        }else{
          // Table just created, creating some rows
          var insert = 'INSERT INTO student (first_name, last_name, phone_number, status) VALUES (?,?,?,?)'
          for (var i=0; i<50; i++) {
            db.run(insert, ["henry-" + i, "huang", 12345678 + i, "active"])
          }

          for (var i=50; i<100; i++) {
            db.run(insert, ["henry-" + i, "huang", 12345678 + i, "delinquent"])
          }

          for (var i=100; i<150; i++) {
            db.run(insert, ["henry-" + i, "huang", 12345678 + i, "dropped"])
          }
        }
      });
  }
});

module.exports = db
