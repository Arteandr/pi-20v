import { Router } from 'express';
import passport from 'passport';
import { TaskCtrl } from '../controllers/TaskController';
import { createTaskValidations } from '../validations/createTask';

const router = Router();

router.get('/', TaskCtrl.index);
router.get('/:id', TaskCtrl.show);
router.delete('/:id', passport.authenticate('jwt'), TaskCtrl.delete);
router.patch(
    '/:id',
    passport.authenticate('jwt'),
    createTaskValidations,
    TaskCtrl.update
);
router.post(
    '/',
    passport.authenticate('jwt'),
    createTaskValidations,
    TaskCtrl.create
);

export default router;
