import { Router } from 'express';
import passport from 'passport';
import { SubjectCtrl } from '../controllers/SubjectController';
import { createSubjectValidations } from '../validations/createSubject';

const router = Router();

router.post(
    '/',
    passport.authenticate('jwt'),
    createSubjectValidations,
    SubjectCtrl.create
);
router.get('/', SubjectCtrl.index);

export default router;
