const mongoose = require('mongoose')
const schema = mongoose.Schema
const user = require('./UserModel')
const PostModel = new schema({
    author: [user],
    title: String,
    context: String,
    image:String,
    comments: { type: Array, default: [] },
    createdAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Post', PostModel)