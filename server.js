// Required modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json');

// Start the express npm package for backend processing
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Save changes to db file function
const save = (dbFile) => {
    fs.writeFile('./db/db.json', JSON.stringify(dbFile), (err) => {
        if (err) {
            console.error(err)
        }
    });
}

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

    // Add newNote to db file
    dbFile.push(newNote);
    save(dbFile);

    // Successful response
    const response = {
        status: 'success',
        body: newNote
    }
    res.status(201).json(response);
});

/* DELETE route for the notes request at /api/notes
    Frontend did not use the parameter query id for delete requests */
app.delete('/api/notes/*', (req, res) => {
    // TODO - Add check for valid id since frontend code didn't use id params

    // Log the DELETE request was received
    console.info(`${req.method} request received to remove a note with ID: ${req.params[0]}`);

    // Store db file
    const dbFile = db;
    // Array index of the id to remove
    const idIndex = db.findIndex(val => {return val.id === req.params[0]});

    // Remove the note from db
    dbFile.splice(idIndex, 1);

    // Save the changes to db file
    save(dbFile);

    // Return message for removed note
    return res.json(`A note was deleted with ID: ${req.params[0]}`);
});

// TODO - Add missing route handler
// TODO - Change routes to be modular if additional routes are needed

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});