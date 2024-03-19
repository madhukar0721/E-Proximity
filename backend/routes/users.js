import { Router } from 'express';
import register  from '../controller/register.js';
import getuser from '../controller/getuserscontroller.js';
import login from '../controller/loginusercontroller.js';
const router = Router();
router.route('/register').post(register);
router.route('/users').get(getuser)
router.route('/login').post(login);
export default router;  