import { Router } from 'express';
import { UserCtrl } from '../controllers/UserController';

const router = Router();

router.get('/', UserCtrl.index);
router.get('/me', UserCtrl.getUserInfo);
router.get('/:id', UserCtrl.show);

export default router;
