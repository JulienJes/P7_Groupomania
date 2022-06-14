const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post.ctrl');

// post-body
router.get('/', postCtrl.readPost);
router.post('/', multer.single("posts"), postCtrl.createPost); 
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);
router.patch('/like-post/:id', postCtrl.likePost);
router.patch('/unlike-post/:id', postCtrl.unLikePost);

// post-comments
router.patch('/comment-post/:id', postCtrl.commentPost);
router.patch('/edit-comment-post/:id', postCtrl.editCommentPost);
router.patch('/delete-comment-post/:id', postCtrl.deleteCommentPost);

module.exports = router;