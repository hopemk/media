const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {UserModel} = require('../database/models/UserModel');
const {verifyPassword} = require('./utils')
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: req => {
        try{
          return req.headers.cookie.split(' ')[1].split('=')[1]
        }
        catch{
          return null
        }
        }
    },
    async (token, done) => {
      console.log('running');
      try {
        return done(null, token.user);
      } catch (error) {
        console.log(error)
        done(error);
      }
    }
  )
);



passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.create({ email, password });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // ...

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await verifyPassword(password, user.password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );