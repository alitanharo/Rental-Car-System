const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res, next) => {
    try {
        const { socialSecurityNumber, password } = req.body;

        const user = await User.findOne({ socialSecurityNumber });
        if (!user) {
            throw new UnauthorizedError('Invalid username or password');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new UnauthorizedError('Invalid username or password');
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const { socialSecurityNumber, password,role } = req.body;

        const existingUser = await User.findOne({ socialSecurityNumber });
        if (existingUser) {
            throw new BadRequestError('User already exists');
        }

        const newUser = new User({ socialSecurityNumber, password,role });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};


const decodeToken = (token) => {
    try {
        const decodedToken = jwt.verify(token,JWT_SECRET);
        return decodedToken;
    } catch (error) {
        throw new UnauthorizedError('Invalid token');
    }
};



const getUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedError('Authorization header missing');
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = decodeToken(token);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            throw new UnauthorizedError('Invalid user');
        }

        res.status(200).json(user.toJSON());
    } catch (error) {
        next(error);
    }
};



;



module.exports = { login, register, logout, decodeToken, getUser };
