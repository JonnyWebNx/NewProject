import express from 'express';
import { signInController, signUpController } from '../controllers/authController';

const router = express.Router();

router.post('/signUp', signUpController);
router.post('/signIn', signInController)

export default router;

