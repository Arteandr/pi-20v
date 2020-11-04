/**---------------------------------IMPORTS---------------------------------*/
/** Express */
import express, { Application } from 'express';

/** Dotenv import and configuring */
import dotenv from 'dotenv';
dotenv.config();
/** CORS */
import cors from 'cors';
/** DATABASE(DB) */
import initDB from './core/db';
/** Auth */
import { passport } from './core/passport';

import users from './routes/users';
import auth from './routes/auth';
import tasks from './routes/tasks';
import contacts from './routes/contacts';
import subjects from './routes/subjects';
import conferences from './routes/conferences';

const app: Application = express(); // Create app instance

/**---------------------------------MIDDLEWARES---------------------------------*/
app.use(express.json()); // json body parser
app.use(passport.initialize()); // auth initialize
app.use(cors()); // use cors

/*---------------------------------ROUTES---------------------------------*/
/** Users */
app.use('/users', users);
app.use('/auth', auth);
app.use('/tasks', tasks);
app.use('/contacts', contacts);
app.use('/subjects', subjects);
app.use('/conferences', conferences);

/** SERVER START */
const start = async () => {
    try {
        await initDB();
        app.listen(8888, (): void => {
            console.log('Server running on 8888');
        });
    } catch (e) {
        console.log(e);
    }
};

if (require.main === module) {
    start();
}

export { app };
