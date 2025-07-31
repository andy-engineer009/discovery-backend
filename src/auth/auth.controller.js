const { successResponse, errorResponse } = require('../helpers/responseHandlers');
const { generateHash,generateSimpleCode,refreshToken } = require('../helpers/jwt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { getUserByEmail, createUser } = require('./auth.service');
const bcrypt = require('bcrypt');

// user login
const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json(errorResponse('Email and password are required', null, 400));
    
    const user = await getUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!user && !isPasswordValid) return res.status(400).json(errorResponse('user cannot found', null, 400));

    const token = refreshToken({ userId: user.id, name:user.name, role_id: user.role });
    res.json(successResponse('Login successful', { token }, 200));
}

// user register
const register = async (req, res) => {
    const {name, email, password } = req.body;
    if(name && email && password){

        // check user 
        const user = await getUserByEmail(email);
        if(user) return res.status(400).json(errorResponse('User already exists', null, 400));

        // create user in database
        const hashedPassword = await generateHash(password);
        const payload = {
            uuid: uuidv4(),
            name, 
            email,
            password: hashedPassword,
            referral_code: generateSimpleCode(),
            total_users: 0,
            withdrawn_users: 0,
            is_active: 1,
            upi_id: null,
            created_at: new Date(),
            updated_at: new Date()
        }

        // create user in database
        const createdUser = await createUser(payload);
        if(!createdUser) return res.status(400).json(errorResponse('Failed to create user', null, 400));
        const token = refreshToken({ userId: createdUser.id, name:createUser.name });
        res.json(successResponse('User registered successfully', { token }, 201));
    }
    else{
        return res.status(400).json(errorResponse('Invalid request', null, 400));
    }
    res.json(successResponse('User registered successfully', { user }, 201));
}

module.exports = {
    login,
    register
}