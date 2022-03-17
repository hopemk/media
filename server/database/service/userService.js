const UserModel = require('../models/UserModel') 

async function getUserById(id) {
  return await UserModel.findById(id).exec()
}

async function getUserByEmail(email) {
    return await UserModel.findOne({ email }).exec()
  }
  async function getUsers(email) {
    return await UserModel.findOne({ email }).exec()
  }

module.exports = { getUserById, getUserByEmail, getUsers }
