import express from 'express';
import fs from 'fs';
import path from 'path';

const PORT = 3001;
const app = express();


// TODO - API route GET /api/notes
// TODO - API route POST /api/notes
// TODO - GET * should return index.html
// TODO - GET /notes should return notes.html
// TODO - Use FS to read/write to db.json


app.listening(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});