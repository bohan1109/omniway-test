import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/register', userController.registerUserController);
router.post('/login', userController.loginUserController);

export default router;
