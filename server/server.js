import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import DBConnection from './database/db.js';
import dotenv from 'dotenv';
import path from 'path'

dotenv.config();

const app = express();

app.use(cors());
const __dirname = path.resolve();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static file access 
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', router);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 8000;

DBConnection();

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));