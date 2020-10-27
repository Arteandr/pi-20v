/**---------------------------------IMPORTS---------------------------------*/
                                /** Basic */    
import express, { Application } from 'express';

                    /** Dotenv import and configuring */
import dotenv from 'dotenv';
dotenv.config();

                              /** Database */
import './core/db';

                                /** Auth */
import { passport } from './core/passport';

/**---------------------------------CONTROLLERS---------------------------------*/
import { UserCtrl } from './controllers/UserController'; // User Controller

/**---------------------------------VALIDATIONS---------------------------------*/
import { registerValidations } from './validations/register';


const app: Application = express(); // Create app instance

/**---------------------------------MIDDLEWARES---------------------------------*/
app.use(express.json());    // json body parser
app.use(passport.initialize()); // auth initialize

/*---------------------------------ROUTES---------------------------------*/
                                /** Users */
app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt', {session: false}), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);
                                /** Auth */
app.post('/auth/register', registerValidations, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);
                                /** Task */


                                /** SERVER START */
app.listen(8888, (): void => {
    console.log('Server running');
    
});
