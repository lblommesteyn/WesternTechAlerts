const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Replace 'your_database_url' with your actual MongoDB connection string
const dbURL = 'mongodb://localhost:27017/your_database_name';

// Connect to MongoDB
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a schema for the user data
const userSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  program: String,
  year: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Save form data to the database
app.post('/submit', (req, res) => {
  const { fullName, phoneNumber, program, year } = req.body;

  const user = new User({
    fullName,
    phoneNumber,
    program,
    year,
  });

  user.save((err) => {
    if (err) {
      console.error('Error saving user data:', err);
      res.status(500).send('Error saving user data');
    } else {
      console.log('User data saved successfully:', user);
      res.status(200).send('User data saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
