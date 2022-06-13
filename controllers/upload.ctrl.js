const UserModel = require('../models/user');
const fs = require('fs')
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors.utils');

exports.uploadProfil = async (req, res) => {
    try {
        if (req.file.detectedMimeType !== 'image/jpg' &&
        req.file.detectedMimeType !== 'image/jpeg' && 
        req.file.detectedMimeType !== 'image/png') {
            throw Error("invalid file");
        }
        if (req.filz.size > 500000) {
            throw Error("max size");
        }
    }
    catch (error) {
        const errors = uploadErrors(error);
        return res.status(400).json(errors);
    }

    // Comme chaque pseudo est unique: on l'utilise comme nom pour l'image, comme même nom de sauvegarde: ça écrasera l'ancien fichier forcément
    const fileName = req.body.name + '.jpg';

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/client/public/uplads/profil/${fileName}`
        )
    )

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set : {picture: "./uploads/profil/" + fileName }},
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