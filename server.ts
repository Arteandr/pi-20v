/**---------------------------------IMPORTS---------------------------------*/
                                /** Express */    
import express, { Application } from 'express';

                    /** Dotenv import and configuring */
import dotenv from 'dotenv';
dotenv.config();

                              /** Database */
import './core/db';

                                /** Auth */
import { passport } from './core/passport';

/**---------------------------------CONTROLLERS---------------------------------*/
import { UserCtrl } from './controllers/UserController';    // User Controller
import { TaskCtrl } from './controllers/TaskController';    // Task Controller

/**---------------------------------VALIDATIONS---------------------------------*/
import { registerValidations } from './validations/register';
import { createTaskValidations } from './validations/createTask';


const app: Application = express(); // Create app instance

/**---------------------------------MIDDLEWARES---------------------------------*/
app.use(express.json());    // json body parser
app.use(passport.initialize()); // auth initialize

/*---------------------------------ROUTES---------------------------------*/
                                /** Users */
app.get('/users', UserCtrl.index);  // Get all users
app.get('/users/me', passport.authenticate('jwt', {session: false}), UserCtrl.getUserInfo); // Get current user
app.get('/users/:id', UserCtrl.show);   //  Get user by id
                                /** Auth */
app.post('/auth/register', registerValidations, UserCtrl.create);   // SignUp
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);   // SignIn
                                /** Task */
app.get('/tasks',TaskCtrl.index);   // Get all tasks
app.get('/tasks/:id', TaskCtrl.show);   // Get task by id
app.delete('/tasks/:id', passport.authenticate('jwt'), TaskCtrl.delete);  // Delete task by id
app.post('/tasks', passport.authenticate('jwt'),createTaskValidations, TaskCtrl.create); // Create new task

                            /** SERVER START */
app.listen(8888, (): void => {
    console.log('Server running');
    
});
