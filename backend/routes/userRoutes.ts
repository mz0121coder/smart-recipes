import express from 'express';

// controller functions
import { signupUser, loginUser } from '../controllers/userControllers';

const router = express.Router();

// login route
router.post('/login', loginUser);
// signup route
router.post('/signup', signupUser);

export default router;
