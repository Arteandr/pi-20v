import express, { Application } from 'express';
import dotenv from 'dotenv';
/** CONFIGURE DOTENV */
dotenv.config();

import { passport } from './core/passport';

/** DATABASE(DB) */
import './core/db';

/** CONTROLLERS */
import { UserCtrl } from './controllers/UserController';

/** VALIDATION */
import { registerValidations } from './validations/register';

/** CREATE APP INSTANCE */
const app: Application = express();

/* MIDDLEWARES */
app.use(express.json());
app.use(passport.initialize());

/* ROUTES */
app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt', {session: false}), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);
app.post('/auth/register', registerValidations, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

app.listen(8888, (): void => {
    console.log('Server running');
    
});
