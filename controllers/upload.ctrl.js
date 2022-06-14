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
            (error, docs) => {
                if (!error) {
                    return res.send(docs);
                } else {
                    return res.status(500).send({ message : error })
                }
            }
        )
    }
    catch (error) {
        return res.status(500).send({ message : error })
    }
}