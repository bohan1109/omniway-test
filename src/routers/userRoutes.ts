import express from 'express';
import userController from '../controllers/userController';
import authenticateJWT from '../middlewares/authenticateJWT';
const router = express.Router();

router.post('/register', userController.registerUserController);
router.post('/login', userController.loginUserController);
router.post('/change-password', userController.changePasswordController);
router.post('/refresh-token', userController.refreshTokenController);
router.get('/dummy-data', authenticateJWT, userController.dummyDataController);
export default router;
