const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const upload = multer();

const postCtrl = require('../controllers/post.ctrl');

// post-body
router.get('/', postCtrl.readPost); //route OK
router.post('/', upload, postCtrl.createPost); // changer multer
router.put('/:id', postCtrl.updatePost); //route OK
router.delete('/:id', postCtrl.deletePost); //route OK
router.patch('/like-post/:id', postCtrl.likePost); //erreur mais ne fait pas planter l'appli et met à jour
router.patch('/unlike-post/:id', postCtrl.unLikePost); //erreur mais ne fait pas planter l'appli et met à jour

// post-comments
router.patch('/comment-post/:id', postCtrl.commentPost); //route ok mais timestamp???
router.patch('/edit-comment-post/:id', postCtrl.editCommentPost); //est-ce que je m'y prends bien?
router.patch('/delete-comment-post/:id', postCtrl.deleteCommentPost); //est-ce que je m'y prends bien?

module.exports = router;