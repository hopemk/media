const mongoose = require('mongoose')
const schema = mongoose.Schema
const { Types } = require("mongoose");
const UserSchema = new schema({
    //_id: { type: Types.ObjectId },
    email: String,
    password: String,
    firstName: String,
    lastName:String,
    createdAt: { type : Date, default: Date.now }
})
const UserModel = mongoose.model('UserModel', UserSchema)
module.exports = {UserModel, UserSchema}