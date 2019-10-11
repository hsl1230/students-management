// Create express app
const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require("./database.js")

var app = express()

app.use(cors())

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
});

app.get("/api/students", (req, res, next) => {
  var sql = "select id, first_name as firstName, last_name as lastName, phone_number as phoneNumber, status from student"
  var params = []
  var status = req.query.status
  if (status) {
    params.push(status)
    sql += " where status = ?"
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json(rows)
  });
});

app.get("/api/statuses", (req, res, next) => {
  var sql = "select status from student_status"
  var params = []

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    console.error(rows.length);
    res.json(rows)
  });
});

app.get("/api/students/:id", (req, res, next) => {
  var sql = "select id, first_name as firstName, last_name as lastName, phone_number as phoneNumber, status from student where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json(row)
  });
});

app.post("/api/students/", bodyParser.json(), (req, res, next) => {
  var errors=[]
  if (!req.body.firstName){
    errors.push("No firstName specified");
  }
  if (!req.body.status){
    errors.push("No status specified");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }
  var data = req.body
  var sql ='INSERT INTO student (first_name, last_name, phone_number, status) VALUES (?,?,?,?)'
  var params =[data.firstName, data.lastName, data.phoneNumber, data.status]
  db.run(sql, params, function (err, result) {
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({
      "message": "success",
      "data": data,
      "id" : this.lastID
    })
  });
})

function u2N(val) {
  if (typeof val === undefined) {
    return null
  } else {
    return val
  }
}

app.patch("/api/students/:id", bodyParser.json(), (req, res, next) => {
  var data = req.body

  db.run(
    `UPDATE student set 
           first_name = COALESCE(?,first_name), 
           last_name = COALESCE(?,last_name), 
           phone_number = COALESCE(?,phone_number),
           status = COALESCE(?,status)
           WHERE id = ?`,
    [data.firstName, data.lastName, data.phoneNumber, data.status, req.params.id],
    function (err, result) {
      if (err){
        res.status(400).json({"error": res.message})
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes
      })
    });
})

app.delete("/api/students/:id", (req, res, next) => {
  db.run(
    'DELETE FROM student WHERE id = ?',
    req.params.id,
    function (err, result) {
      if (err){
        res.status(400).json({"error": res.message})
        return;
      }
      res.json({"message":"deleted", changes: this.changes})
    });
})

// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res){
  res.status(404);
});

// Server port
var HTTP_PORT = 8070
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
