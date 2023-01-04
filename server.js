const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
//app.use('/api', api);

app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// GET route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// GET route for the notes request at /api/notes, loads existing notes
app.get('/api/notes', (req, res) => res.json(db));

//POST route to save note request at /api/notes
app.post('/api/notes', (req, res) => {
    // Log the POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destruct assignment for the items in req.body
    const { title, text } = req.body;

    // TODO - Check all required values present - Frontend js is actually handling this

    // Store db file
    const dbFile = db;

    // Generate the note obj with a unique id
    const newNote = {
        id: uuidv4(),
        'title': title,
        'text': text
    }

    // // Add newNote to db file
    dbFile.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(dbFile), (err) => {
        if (err) {
            console.error(err)
        }
    });

    // Successful response
    const response = {
        status: 'success',
        body: newNote
    }
    res.status(201).json(response);

});

// DELETE route for the notes request at /api/notes
app.delete('/api/notes:id', (req, res) => {
    // Handle note delete request




    
});

// TODO - Missing route handler

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});