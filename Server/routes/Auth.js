const express = require('express');
const passport = require('passport');

const { createUser,signinUser, checkAuth,resetPasswordRequest,resetPassword,resetPasswordRequestUser,resetPasswordUser} = require('../Controller/Auth');


const router = express.Router();

router.post('/signup',createUser);
router.post('/reset-password-request',resetPasswordRequest);
router.post('/reset-password',resetPassword);
router.post('/reset-password-request-user',resetPasswordRequestUser);
router.post('/reset-password-user',resetPasswordUser);
router.post('/signin',passport.authenticate('local'),signinUser);
router.get('/check',passport.authenticate('jwt'),checkAuth);


exports.router =router;