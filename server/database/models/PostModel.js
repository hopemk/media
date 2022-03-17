const mongoose = require('mongoose')
const schema = mongoose.Schema
const {UserSchema} = require('./UserModel')
const PostModel = new schema({
    author: {type : UserSchema},
    title: String,
    context: String,
    image:String,
    comments: { type: Array, default: [] },
    createdAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Post', PostModel)