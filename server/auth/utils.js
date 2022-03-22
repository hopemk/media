const passport = require('passport')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { UserModel } = require ('../database/models/UserModel')

  const setup = () => {
    passport.serializeUser((user, done) => done(null, user._id))
  
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await UserModel.findById(id)
        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    })
  }
  
  const signToken = (user) => {
    return jwt.sign({ data: user }, process.env.JWT_SECRET, {
      expiresIn: 604800
    })
  }
  const verifyToken = (req) => {
    //console.log(req.headers.cookie.split(' ')[2])
    const token = req.headers.cookie.split(' ')[1].split('=')[1];
    
    return jwt.verify(token, 'TOP_SECRET');
  }
  const hashPassword = async password => {
    if (!password) {
      throw new Error('Password was not provided')
    }
  
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }
  const verifyPassword = async (candidate, actual) => {
    return await bcrypt.compare(candidate, actual)
  }
  const checkIsInRole = (...roles) => (req, res, next) => {
    if (!req.user) {
      return res.redirect('/login')
    }
  
    const hasRole = roles.find(role => req.user.role === role)
    if (!hasRole) {
      return res.redirect('/login')
    }
  
    return next()
  }
  module.exports= { setup, signToken, verifyToken, hashPassword, verifyPassword, checkIsInRole }