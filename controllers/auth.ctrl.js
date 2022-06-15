const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET,{
        expiresIn: maxAge
    })
};

exports.signUp = async (req, res, next) => {
    console.log(req.body);
    const {pseudo, email, password} = req.body;

    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({ user: user._id});
    }
    catch(error) {
        const errors = signUpErrors(error);
        res.status(400).json({errors});
    }
}

exports.signIn = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge, sameSite: 'None'});
        res.status(200).json("user:" + user._id);
    } catch (error) {
        const errors = signInErrors(error);
        res.status(400).json({errors});
    }
}

exports.logOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}