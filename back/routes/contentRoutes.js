const express = require('express');
const router = express.Router();

const contentCtrl = require('../controllers/contentCtrl');

router.post('/new', contentCtrl.addNewPost);
router.get('/', contentCtrl.getAllPosts);
// router.get('/:id', contentCtrl.getOnePost);

router.put('/:id', contentCtrl.modifyPost);
router.delete('/:id/delete', contentCtrl.deletePost);

router.post('/:id/comment', contentCtrl.addNewComment);
router.put('/:id/comment', contentCtrl.deleteComment);

router.get('/:userId', contentCtrl.getUserNameFromId);
router.get('/user/email', contentCtrl.getUserEmail);

module.exports = router;