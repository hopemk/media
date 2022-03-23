const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
const mongoose = require('mongoose')
const passport = require('passport');
require('./auth/auth');
//const connectToDatabase = require('./database/connection.js')
const db = mongoose.connect('mongodb+srv://media_app:secure123.@cluster0.2f43e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')



nextApp.prepare().then(() => {
    // express code here
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api/photos', require('./routes/index')) 
    app.use('/api/user', require('./routes/user')) 
    app.use('/api/post', passport.authenticate('jwt', { session: false }), require('./routes/post')) 
    app.use('/api/', require('./routes/auth'))
    app.use('/api/downloadimage', require('./routes/file')) 
    app.get('/newpost', passport.authenticate('jwt', { session: false,failureRedirect: '/login' }), (req,res) => {
        return handle(req,res) // for all the react stuff
    }) 
    app.get('/allposts', passport.authenticate('jwt', { session: false,failureRedirect: '/login'}), (req,res) => {
        return handle(req,res) // for all the react stuff
    }) 
    app.get('*', (req,res) => {
        return handle(req,res) // for all the react stuff
    })
    
    //let conn = await connectToDatabase();
 //console.log(conn);
    app.listen(PORT, err => {
        if (err) throw err;
        console.log(`ready at http://localhost:${PORT}`)
    })
})