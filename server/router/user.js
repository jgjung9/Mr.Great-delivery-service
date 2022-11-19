import express from 'express';
import 'express-async-errors';
import * as userController from '../controller/user.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

export default router;
