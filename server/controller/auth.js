import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../data/user.js';
import { config } from '../config.js';

export async function signup(req, res) {
    const { user_id, password, user_nm, phone_no } = req.body;
    const found = await userRepository.findByUserNo(user_id);
    if (found) {
        return res.status(409).json({ message: `${user_id} already exists` });
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const user = await userRepository.createUser({
        user_id,
        password: hashed,
        user_nm,
        phone_no,
    });
    const token = createJwtToken(user.user_no);
    res.status(201).json({ token, user_id });
}

export async function login(req, res) {
    const { user_id, password } = req.body;
    const user = await userRepository.findByUserId(user_id);
    if (!user) {
        return res.status(401).json({ message: 'Invalid User ID or Password' });
    }
    const isRightPassword = await bcrypt.compare(password, user.password);
    if (!isRightPassword) {
        return res.status(401).json({ message: 'Invalid User ID or Password' });
    }
    const token = createJwtToken(user.user_no);
    res.status(200).json({ token, user_id });
}

export async function me(req, res) {
    const user = await userRepository.findByUserNo(req.user_no);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ token: req.token, user_id: user.user_id });
}

function createJwtToken(user_no) {
    return jwt.sign({ user_no }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec,
    });
}
