const PostModel = require('../models/post');
const UserModel = require('../models/user');
const ObjectID = require('mongoose').Types.ObjectId; // pour vérifier que le paramêtre existe déjà dans la BDD
const { uploadErrors } = require('../utils/errors.utils');
const fs = require('fs')
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);

exports.readPost = (req, res, next) => {
    PostModel.find((error, docs) => {
        if(!error) {
            res.send(docs);
        } else {
            console.log('Error to get data :' + error);
        }
    }).sort({ createdAt: -1 }); // tri du plus récent au plus ancien post
}

exports.createPost = async (req, res, next) => {
    /*let fileName;
    
    if (req.file !== null) {
        try {
            if (req.file.mimetype !== 'image/jpg' &&
            req.file.mimetype !== 'image/jpeg' && 
            req.file.mimetype !== 'image/png') {
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
    
        fileName = req.body.posterId + Date.now() + '.jpg';

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${fileName}`
            )
        )
    }*/

    const newPost = new PostModel( {
        posterId: req.body.posterId,
        message: req.body.message,
        //picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        //video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

exports.updatePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        const updatedRecord = {
            message: req.body.message
        }
        PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true },
            (error, docs) => {
                if (!error) {
                    res.send(docs);
                } else {
                    console.log("Update error : " + error);
                }
            }
        )
    }
}

exports.deletePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        PostModel.findByIdAndRemove(
            req.params.id,
            (error, docs) => {
                if (!error) {
                    res.send(docs);
                } else {
                    console.log("Delete error " + error);
                }
            }
        )
    }
}

exports.likePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { likers: req.body.id }
                },
                { new : true },
                (error, docs) => {
                    if(error){
                        return res.status(400).send(error);
                    }
                }
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                {
                    $addToSet: { likes: req.params.id}
                },
                { new : true },
                (error, docs) => {
                    if(!error) {
                        res.send(docs);
                    } else {
                        return res.status(400).send(error);
                    }
                }
            )
        }
        catch (error) {
            console.log(error)
            return res.status(400).send(error);
        }
    }
}

exports.unLikePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { likers: req.body.id }
                },
                { new : true },
                (error, docs) => {
                    if(error){
                        return res.status(400).send(error);
                    }
                }
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                {
                    $pull: { likes: req.params.id}
                },
                { new : true },
                (error, docs) => {
                    if(!error) {
                        res.send(docs);
                    } else {
                        return res.status(400).send(error);
                    }
                }
            )
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
}

exports.commentPost = (req, res , next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            return PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $push: {
                        comments :{
                            commenterId: req.body.commenterId,
                            commentPseudo: req.body.commenterPseudo,
                            text: req.body.text,
                            timestamps: new Date().getTime()
                        }
                    }
                },
                { new : true },
                (error, docs) => {
                    if (!error) {
                        res.send(docs);
                    } else {
                        return res.status(400).send(error);
                    }
                }
            )
        }
        catch(error) {
            return res.status(400).send(error);
        }
    }
}

exports.editCommentPost = (req, res , next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            return PostModel.findById(
                req.paramas.id,
                (error, docs) => {
                    const theComment = docs.comments.find((comment) => {
                        comment._id.equals(req.body.commentId)
                    })
                    if(!theComment) {
                        return res.status(404).send('Comment not found')
                    } else {
                        theComment.text = req.body.text;
                    }
                    return docs.save((error) => {
                        if(!error) {
                            res.status(2000).docs;
                        } else {
                            return res.status(500).send(error);
                        }
                    })
                }
            )
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
}

exports.deleteCommentPost = (req, res , next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    }

    try {
        return PostModel.findByIdAndUpdate(
            req.paramas.id,
            {
                $pill: {
                    comments: {
                        _id: req.body.commentId,
                    }
                }
            },
            { new : true },
            (error, docs) => {
                if(!error) {
                    return res.send(docs);
                } else {
                    return res.status(400).send(error);
                }
            }
        )
    }
    catch(error) {
        return res.status(400).send(error);
    }
}