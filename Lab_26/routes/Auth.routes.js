const express = require('express');
const AuthController = require('../Controllers/Auth.controller');
const passport = require("passport");
const  google  = require('../Controllers/google.controller');

const router = express.Router();

router.get('/login', AuthController.getlogin);
router.get('/google', google.google);
router.get('/google/redirect', passport.authenticate("google") ,google.redirect)

module.exports = router;