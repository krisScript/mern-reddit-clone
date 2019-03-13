const express = require('express');
const { body } = require('express-validator/check');
const Community  = require('../models/community')
const communityController = require('../controllers/community');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post(
  '/create-community',
  isAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 3,max:21 })
      .escape()
      .custom((name, { req }) => {
        return Community.findOne({ name }).then(CommunityDoc => {
          if (CommunityDoc) {
            return Promise.reject('Community Name is already taken');
          }
        });
      }),
    body('description')
      .trim()
      .isLength({ min: 3 })
      .escape()
      .trim()
  ],
  communityController.createCommunity
);

router.get('/community/:communityName',communityController.getCommunity);

// router.put(
//   '/post/:postId',
//   isAuth,
//   [
//     body('title')
//       .trim()
//       .isLength({ min: 5 }),
//     body('content')
//       .trim()
//       .isLength({ min: 5 })
//   ],
//   feedController.updatePost
// );

// router.delete('/post/:postId', isAuth, feedController.deletePost);low s
module.exports = router;