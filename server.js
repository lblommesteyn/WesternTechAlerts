const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

const app = express();
const port = 3000;
const mysql = require('mysql')
// // Replace 'your_database_url' with your actual MongoDB connection string
// const dbURL = 'mongodb://localhost:27017/your_database_name';

// // Connect to MongoDB
// mongoose.connect(dbURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Create a schema for the user data
// const userSchema = new mongoose.Schema({
//   fullName: String,
//   phoneNumber: String,
//   program: String,
//   year: String,
// });

// const User = mongoose.model('User', userSchema);

 
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "wta123",
    database: "wta"
})
 


// Connecting to database
connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log(`Database Connected`)
        connection.query(`SHOW DATABASES`,
            function (err, result) {
                if (err)
                    console.log(`Error executing the query - ${err}`)
                else
                    console.log("Result: ", result)
            })
    }
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/createUsers", (req, res) => {
  let sql = "CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), phoneNumber VARCHAR(255), program VARCHAR(255), year VARCHAR(255), PRIMARY KEY(id))";
  connection.query(sql, (err) => {
    if (err) {

      throw err;

    }

    res.send("Employee table created");

  });

});
// // Save form data to the database
// app.post('/submit', (req, res) => {
//   const { fullName, phoneNumber, program, year } = req.body;

//   const user = new User({
//     fullName,
//     phoneNumber,
//     program,
//     year,
//   });

//   user.save((err) => {
//     if (err) {
//       console.error('Error saving user data:', err);
//       res.status(500).send('Error saving user data');
//     } else {
//       console.log('User data saved successfully:', user);
//       res.status(200).send('User data saved successfully');
//     }
//   });
// });

app.post('/submit', function (req, res, next) {
  var name = req.body.name
  var phoneNumber = req.body.pN
  var year = req.body.year
  var program = req.body.program

  var sql = `INSERT INTO users (name, phoneNumber, program, year) VALUES ("${name}", "${phoneNumber}", "${program}", "${year}")`
  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log('Row has been updated')
    req.flash('success', 'Data stored!')
    res.redirect('/')
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
