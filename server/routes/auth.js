const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router()
const Post = require('../database/models/PostModel')
const {getUserById, getUserByEmail} = require('../database/service/userService')
const { hashPassword } = require('../auth/utils')
//const {getUserbyId, getUserByEmail} = require('../database/service/userService')
//const {} to } = require('await-to-js')
// ...

// ...

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.status(200).cookie('jwt', token, {httpOnly: false }).json({success: true,data: token}) 
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = router;