const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3002
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
const mongoose = require('mongoose')
require('./auth/auth');
const connectToDatabase = require('./database/connection.js')
const db = mongoose.connect('mongodb://localhost/MyDatabase1')



nextApp.prepare().then(() => {
    // express code here
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api/photos', require('./routes/index')) 
    app.use('/api/user', require('./routes/user')) 
    app.use('/api/post', require('./routes/post')) 
    app.use('/login', require('./routes/auth')) 
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