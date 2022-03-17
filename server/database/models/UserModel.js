const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserModel = new schema({
    email: String,
    password: String,
    firstName: String,
    lastName:String,
    createdAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('User', UserModel)