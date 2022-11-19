import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateCredential = [
    body('user_id').trim().notEmpty().withMessage('user_id를 입력하세요!'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('password는 최소 5글자 이상입니다!'),
    validate,
];

const validateSignup = [
    ...validateCredential,
    body('user_nm').notEmpty().withMessage('name is missing'),
    body('phone_no').notEmpty().withMessage('phone number is missing'),
    validate,
];

// POST /auth/signup
router.post('/signup', validateSignup, authController.signup);

// POST /auth/login
router.post('/login', validateCredential, authController.login);

// GET /auth/me
router.get('/me', isAuth, authController.me);

export default router;
