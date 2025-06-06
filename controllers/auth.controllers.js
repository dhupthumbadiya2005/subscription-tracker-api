import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';
import User from '../models/user.model.js';

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        
        // Input validation
        if (!name || !email || !password) {
            const error = new Error('Please provide all required fields');
            error.statusCode = 400;
            throw error;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session });

        const token = jwt.sign(
            { userId: newUser[0]._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: {
                    id: newUser[0]._id,
                    name: newUser[0].name,
                    email: newUser[0].email
                }
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            const error = new Error('Please provide email and password');
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Ensure both password and user.password are strings
        if (typeof password !== 'string' || typeof user.password !== 'string') {
            const error = new Error('Invalid password format');
            error.statusCode = 400;
            throw error;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({
            success: true,
            message: 'Signin successful',
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        res.status(200).json({
            success: true,
            message: 'Signout successful'
        });
    } catch (error) {
        next(error);
    }
};



