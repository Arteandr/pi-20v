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

/**---------------------------------CONTROLLERS---------------------------------*/
import { UserCtrl } from './controllers/UserController'; // User Controller
import { TaskCtrl } from './controllers/TaskController'; // Task Controller
import { ContactCtrl } from './controllers/ContactController'; // Contact Controller
import { SubjectCtrl } from './controllers/SubjectController'; // Subject Controller
import { ConferenceCtrl } from './controllers/ConferenceController'; // Subject Controller

/**---------------------------------VALIDATIONS---------------------------------*/
import { registerValidations } from './validations/register';
import { createTaskValidations } from './validations/createTask';
import { createContactValidations } from './validations/createContact';

const app: Application = express(); // Create app instance

/**---------------------------------MIDDLEWARES---------------------------------*/
app.use(express.json()); // json body parser
app.use(passport.initialize()); // auth initialize
app.use(cors()); // use cors

/*---------------------------------ROUTES---------------------------------*/
/** Users */
app.get('/users', UserCtrl.index); // Get all users
app.get(
    '/users/me',
    passport.authenticate('jwt', { session: false }),
    UserCtrl.getUserInfo
); // Get current user
app.get('/users/:id', UserCtrl.show); //  Get user by id
/** Auth */
app.post('/auth/register', registerValidations, UserCtrl.create); // SignUp
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin); // SignIn
/** Task */
app.get('/tasks', TaskCtrl.index); // Get all tasks
app.get('/tasks/:id', TaskCtrl.show); // Get task by id
app.delete('/tasks/:id', passport.authenticate('jwt'), TaskCtrl.delete); // Delete task by id
app.patch(
    '/tasks/:id',
    passport.authenticate('jwt'),
    createTaskValidations,
    TaskCtrl.update
); // Update task by id
app.post(
    '/tasks',
    passport.authenticate('jwt'),
    createTaskValidations,
    TaskCtrl.create
); // Create new task
/** Contacts */
app.get('/contacts', ContactCtrl.index);
app.post(
    '/contacts',
    passport.authenticate('jwt'),
    createContactValidations,
    ContactCtrl.create
);

app.post('/subjects', passport.authenticate('jwt'), SubjectCtrl.create);
app.get('/subjects', SubjectCtrl.index);

app.post('/conferences', passport.authenticate('jwt'), ConferenceCtrl.create);
app.get('/conferences', ConferenceCtrl.index);
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
