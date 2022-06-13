const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const authCtrl = require('../controllers/auth.ctrl');
const userCtrl = require('../controllers/user.ctrl');
const uploadCtrl = require ('../controllers/upload.ctrl');

// Authentification
router.post('/register', authCtrl.signUp); //route OK
router.post('/login', authCtrl.signIn); //route OK
router.get('/logout', authCtrl.logOut); //route OK

// User DB
router.get('/', userCtrl.getAllUsers); //route OK
router.get('/:id', userCtrl.userInfo); //route OK
router.put('/:id', userCtrl.updateUser); //fait planter l'application, ERR_HTTP_HEADERS_SENT joue le !error et le catch du controller en même temps mais met à jour l'utilisateur tout de même (sauf pour admin)
router.delete('/:id', userCtrl.deleteUser); //route OK

// Upload
//router.post('/upload', upload.single('file') , uploadCtrl.uploadProfil)

module.exports = router;