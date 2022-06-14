const UserModel = require('../models/user');
const fs = require('fs')
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors.utils');

exports.uploadProfil = async (req, res) => {
    try {
        console.log(req.file)
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set : {picture: `http://localhost:${process.env.PORT_FRONT}/uploads/profil/` + req.file.filename }},
            { new : true, upsert: true, setDefaultOnInsert: true },
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(400).json("Impossible d'upload")
        }
    )}
    catch (error) {
        return res.status(500).send({ message : error })
    }
}