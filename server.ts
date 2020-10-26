import express, { Application } from 'express';
import dotenv from 'dotenv';
/** CONFIGURE DOTENV */
dotenv.config();

/** DATABASE(DB) */
import './core/db';

/** VALIDATION */
import { registerValidations } from './validations/register';

/** CONTROLLERS */
import { UserCtrl } from './controllers/UserController';

/** CREATE APP INSTANCE */
const app: Application = express();

/* MIDDLEWARES */
app.use(express.json());

/* ROUTES */
app.get('/users', UserCtrl.index);
app.post('/users', registerValidations, UserCtrl.create);
//app.get('users', UserCtrl.create);
//app.get('users', UserCtrl.create);

app.listen(8888, (): void => {
    console.log('Server running');
});
