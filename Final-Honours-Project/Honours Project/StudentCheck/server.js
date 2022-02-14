const express = require('express');
const path = require('path');
const db = require('./config/database')
const app = express();
//const sequelize = require('sequelize')
app.use(express.json());

db.authenticate().then(() => console.log("db connected"));

/** set up routes */
app.use('/coursework', require('./routes/courseworkRouter'))
app.use('/staff', require('./routes/staffRouter'))
app.use('/lectures', require('./routes/lectureRouter'))
app.use('/students', require('./routes/studentsRouter'))
app.use('/enrolment', require('./routes/enrolmentRouter'))

/** this was neccessary for deployment
 * information used from express docs 
 * available at https://expressjs.com/en/starter/static-files.html
 * informational video 
 */
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
}); 

const PORT = process.env.PORT || 3000
app.listen(PORT, (req, res) => {
  console.log(`server listening on port: ${PORT}`)
});

/*
Uncomment the below command to set up the database on your own table.

WARNING!!!!
Do not do this until your own database has been set up in the ./config/database.js file
This action when completely sync the schema defined in the server
Therefore it will DROP all tables and re-sync
So only do this on an empty database!
 */

/* sequelize.sync({
  force: true
}); */
