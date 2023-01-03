const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = 3001;
const app = express();

app.use(express.json());

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// TODO - API route GET /api/notes
// TODO - API route POST /api/notes
// TODO - GET * should return index.html
// TODO - GET /notes should return notes.html
// TODO - Use FS to read/write to db.json


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});