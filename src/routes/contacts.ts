import { Router } from 'express';
import passport from 'passport';
import { ContactCtrl } from '../controllers/ContactController';
import { createContactValidations } from '../validations/createContact';

const router = Router();

router.get('/', ContactCtrl.index);
router.post(
    '/',
    passport.authenticate('jwt'),
    createContactValidations,
    ContactCtrl.create
);

export default router;
