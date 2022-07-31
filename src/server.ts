import express from 'express';
import { engine } from 'express-handlebars';

import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import Controller from './app/controllers/Controller';

const app = express();

// Configuring express
app.use(cors());
app.use(express.json());

// Configuring handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/templates');

// Application routes
app.post('/', Controller.handle)
app.get('/', Controller.handle)

// Multer configuration to upload files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Starting the server
app.listen(3333, () => console.log('Server started on port 3333'));
