import express from 'express';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // call to get random id

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