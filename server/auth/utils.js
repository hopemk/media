//import passport from 'passport'
//import jwt from "jsonwebtoken"
const bcrypt = require("bcrypt")
// { UserModel } from '../database/schema'

async function hashPassword(password){
    if (!password) {
      throw new Error('Password was not provided')
    }
  
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }
  module.exports = {hashPassword}