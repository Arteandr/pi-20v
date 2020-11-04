import { Router } from 'express';
import passport from 'passport';
import { ConferenceCtrl } from '../controllers/ConferenceController';
import { createConferenceValidations } from '../validations/createConference';

const router = Router();

router.post(
    '/',
    passport.authenticate('jwt'),
    createConferenceValidations,
    ConferenceCtrl.create
);
router.get('/', ConferenceCtrl.index);

export default router;
