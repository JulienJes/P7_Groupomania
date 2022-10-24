const PostModel = require('../models/post');
const UserModel = require('../models/user');
const ObjectID = require('mongoose').Types.ObjectId; // pour vérifier que le paramêtre existe déjà dans la BDD
//const { uploadErrors } = require('../utils/errors.utils');
const fs = require('fs');

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
    const newPost = new PostModel( {
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== undefined ? `http://localhost:${process.env.PORT_FRONT}/uploads/posts/` + req.file.filename : "",
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
        PostModel.findOne({ _id : req.params.id})
        .then((post) => {
            if (!post) {
                res.status(404).json({error: new Error('Post non trouvé !')});
              }
            const filename = post.picture.split('/posts/')[1];
            
            fs.unlink(`./client/public/uploads/posts/${filename}`, () => {
                PostModel.deleteOne({ _id: req.params.id }) 
                    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
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
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                {
                    $addToSet: { likes: req.params.id}
                },
                { new : true },
            )
            return res.status(200).send('OK');
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
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                {
                    $pull: { likes: req.params.id}
                },
                { new : true },
            )
            return res.status(200).send('OK');
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