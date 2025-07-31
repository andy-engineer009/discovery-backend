const express = require('express');
const router = express.Router();
const { login, register } = require('./auth.controller');

router.post('/login', login);
router.post('/signup', register);

module.exports = router;