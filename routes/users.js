const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

//Use passport as middle for authenticated
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}, 
),usersController.createSession);
module.exports = router;