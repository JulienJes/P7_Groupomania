const UserModel = require('../models/user');
const fs = require('fs')
//const { uploadErrors } = require('../utils/errors.utils');

exports.uploadProfil = (req, res) => {
    UserModel.findOne({ _id : req.params.id})
        .then((upload) => {
            if (!upload) {
                res.status(404).json({error: new Error('Image non trouvée !')});
              }
            const filename = upload.picture.split('/profil/')[1];
            const defaultPicture = "default-user-pic.png";

            if(filename.match(defaultPicture)){
                UserModel.updateOne( { _id: req.body.posterId},
                    { $set : {picture: `http://localhost:${process.env.PORT_FRONT}/uploads/profil/` + req.file.filename }},
                    { new : true, upsert: true, setDefaultOnInsert: true }
                ) 
                    .then(() => res.status(200).json({ message: 'Image supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                fs.unlink(`./client/public/uploads/profil/${filename}`, () => {
                    UserModel.updateOne( { _id: req.body.posterId},
                        { $set : {picture: `http://localhost:${process.env.PORT_FRONT}/uploads/profil/` + req.file.filename }},
                        { new : true, upsert: true, setDefaultOnInsert: true }
                    ) 
                        .then(() => res.status(200).json({ message: 'Image supprimée !'}))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => {console.log(error)})
}