const Post = require('../models/post');
const User = require('../models/user');
const mongoose = require('mongoose');
const Community = require('../models/community');
const { validationResult } = require('express-validator/check');

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, communityId } = req.body;
    const user = await User.findById(req.userId);
    const community = await Community.findById(communityId);
    const errors = validationResult(req);
    console.log(user);
    if (!errors.isEmpty()) {
      const errorMsg = errors.array()[0].msg;
      res.json({ error: errorMsg });
    } else {
      const post = new Post({
        title,
        content,
        community: communityId,
        authorId: req.userId,
        author: user.username,
        communityName: community.name
      });
      await post.save();
      res.status(200).json({ msg: 'Post succesfully added', postId: post._id });
    }
  } catch (err) {
    console.log(err);
    // errorFunc(err, next);
  }
};
exports.getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    mongoose.Types.ObjectId;
    res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    // errorFunc(err, next);
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ msg: 'Post Deleted' });
  } catch (err) {
    console.log(err);
    // errorFunc(err, next);
  }
};
exports.editPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg = errors.array()[0].msg;
      res.json({ error: errorMsg });
    } else {
      const { title, content } = req.body;
      const { postId } = req.params;
      const post = {
        title,
        content
      };
      await Post.findOneAndUpdate({ _id: postId }, post);
      res.status(200).json({ msg: 'updated' });
    }
  } catch (err) {
    errorFunc(err, next);
  }
};

exports.upvote = async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(postId)
    const post  = await Post.findById(postId)
    const user = await User.findById(req.userId);
    console.log(user.checkUpvoted(postId))
    if (user.checkUpvoted(postId)) {
      console.log('first upvote')
      user.removeUpvoted(postId);
      post.decrementUpvotes()
    } else {
      if (user.checkDownvoted(postId)) {
             console.log('second upvote')
       user.removeDownvoted(postId);
        post.decrementDownvotes()
      }else {
      console.log('third upvote')
      user.addUpvoted(postId);
      post.incrementUpvotes();
      }
    }
    res.status(200).json({ postUpvotes: post.upvotes,postDownvotes:post.downvotes });
  } catch (err) {
    console.log(err);
    // errorFunc(err, next);
  }
};

exports.downvote = async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(postId)
    const user = await User.findById(req.userId);
    const post  = await Post.findById(postId)
    console.log(user.checkDownvoted(postId))
    if (user.checkDownvoted(postId)) {
      user.removeDownvoted(postId);
      post.decrementDownvotes();
    } else {
      if (user.checkUpvoted(postId)) {
        user.removeUpvoted(postId);
        post.decrementUpvotes()
      }else {
        user.addDownvoted(postId);
      post.incrementDownvotes();
      }
    }
  } catch (err) {
    console.log(err);
    // errorFunc(err, next);
  }
};
