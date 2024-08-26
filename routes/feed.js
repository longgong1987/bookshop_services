const express = require('express');
const feedController = require('../controllers/feed');
const { body } = require('express-validator');
const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post('/post', [
    body('title').trim().isLength({ min: 10}),
    body('content').trim().isLength({ min: 5}),
], feedController.createPost);

// GET /feed/post/:postId
router.get('/post/:postId', feedController.getPostById);

module.exports = router;