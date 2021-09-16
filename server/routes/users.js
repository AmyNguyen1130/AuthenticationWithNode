const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const UserController = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/routerHelpers');


router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), UserController.signIn);

router.route('/google/oauth')
.post(passport.authenticate('googleToken', {session: false}), UserController.googleOAuth);

router.route('/facebook/oauth')
.post(passport.authenticate('facebookToken', {session: false}), UserController.facebookOAuth);

router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), UserController.secret);

module.exports = router;