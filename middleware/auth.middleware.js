const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
            if(error) { //Si il y a une erreur on retire le cookie
                res.locals.user = null;
                // res.cookie('jwt', '', { maxAge: 1 }); semble supprimer le cookie à la moindre erreur, donc on laisse le front s'en charger
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
            if(error) {
                console.log(error);
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log('No token');
    }
}