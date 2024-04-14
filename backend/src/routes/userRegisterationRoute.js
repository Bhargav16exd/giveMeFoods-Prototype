import {Router} from 'express';
import { login, logout, registerUser } from '../controllers/user.controller.js';



const router = Router();

// User Registeration Route

router.route('/register').post(registerUser)
router.route('/login').post(login)

router.route('/logout').post(logout)




export default router;