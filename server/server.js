import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import DBConnection from './database/db.js';
import hello from '../client/build'
import dotenv from 'dotenv';
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static file access 
app.use(express.static(path.join(__dirname, '../client/build')));

//routes
app.use('/', router);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 8000;

DBConnection();

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));