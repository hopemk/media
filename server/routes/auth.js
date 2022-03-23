const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router()
const Post = require('../database/models/PostModel')
const {getUserById, getUserByEmail} = require('../database/service/userService')
const { hashPassword, verifyToken } = require('../auth/utils')
//const {getUserbyId, getUserByEmail} = require('../database/service/userService')
//const {} to } = require('await-to-js')
// ...

// ...
router.get('/login', async (req, res) => {
  const decodedToken = verifyToken(req)
    //const userId = decodedToken.user._id
    //let author = await getUserById(userId);
    return res.status(200).json({success: true,data: decodedToken}) 
})
router.get('/logout', async (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
})
res
    .status(200)
    .json({ success: true, message: 'User logged out successfully' })
}
)

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

              const body = { _id: user._id, email: user.email, firstName: user.firstName, lastName:user.lastName, image:user.image };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.status(200).cookie('jwt', token, {expires: new Date(Date.now() + 900000),httpOnly: false }).json({success: true,data: token}) 
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