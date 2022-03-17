const {UserModel} = require('../models/UserModel') 
const { Types } = require("mongoose");
async function getUserById(id) {
  return await UserModel.findById(Types.ObjectId(id)).exec()
}

async function getUserByEmail(email) {
    return await UserModel.findOne({ email }).exec()
  }
  async function getUsers(email) {
    return await UserModel.findOne({ email }).exec()
  }

module.exports = { getUserById, getUserByEmail, getUsers }
