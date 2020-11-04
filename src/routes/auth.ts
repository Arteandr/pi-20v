import { Router } from 'express';
import passport from 'passport';
import { UserCtrl } from '../controllers/UserController';
import { registerValidations } from '../validations/register';

const router = Router();

router.post('/register', registerValidations, UserCtrl.create); // SignUp
router.post('/login', passport.authenticate('local'), UserCtrl.afterLogin); // SignIn

export default router;
