const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data store for student marks
let studentData = {};

// Route for serving index.ejs
app.get('/', (req, res) => {
    const registerNumber = req.query.registerNumber;
    const marks = studentData[registerNumber];
    let gpa = 0;

    if (marks) {
        // Calculate GPA (simplified calculation for demonstration)
        let totalMarks = 0;
        for (const key in marks) {
            totalMarks += marks[key];
        }
        gpa = (totalMarks / 5) / 10;
    }

    res.render('index', { marks, gpa });
});

// Route for handling form submission
app.post('/submit', (req, res) => {
    const registerNumber = req.body.registerNumber;
    const marks = {
        subject1: parseFloat(req.body.subject1),
        subject2: parseFloat(req.body.subject2),
        subject3: parseFloat(req.body.subject3),
        subject4: parseFloat(req.body.subject4),
        subject5: parseFloat(req.body.subject5)
    };
    
    // Store student marks in memory
    studentData[registerNumber] = marks;

    res.redirect(`/?registerNumber=${registerNumber}`);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
