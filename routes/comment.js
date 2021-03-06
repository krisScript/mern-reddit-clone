const express = require('express');
const { body } = require('express-validator/check');
const commentController = require('../controllers/comment');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
router.post(
  '/post/:postId',
  [
    body('content', 'Content should be atleast 1 character long')
      .isLength({ min: 1 })
      .isString()
      .trim()
  ],
  isAuth,
  commentController.createComment
);
router.post(
  '/edit/:commentId',
  [
    body('content', 'Content should be atleast 1 character long')
      .isLength({ min: 1 })
      .isString()
      .trim()
  ],
  isAuth,
  commentController.editComment
);
router.get('/comments/:postId', commentController.getComments);
router.delete('/delete/:commentId', isAuth, commentController.deleteComment);

module.exports = router;
