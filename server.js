const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json');

const PORT = 3001;
const app = express();

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

// GET route for the notes request at /api/notes
app.get('/api/notes', (req, res) => {
    // Handle existing notes request
});

//POST route for the notes request at /api/notes
app.post('/api/notes', (req, res) => {
    // Handle saving notes request
});

// DELETE route for the notes request at /api/notes
app.delete('/api/notes:id', (req, res) => {
    // Handle note delete request
});

// TODO - Missing route handler

// TODO - API route GET /api/notes
// TODO - API route POST /api/notes
// TODO - GET * should return index.html
// TODO - GET /notes should return notes.html
// TODO - Use FS to read/write to db.json


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});