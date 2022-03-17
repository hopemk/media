const express = require('express')
const router = express.Router()
const {UserModel} = require('../database/models/UserModel')
const {getUserbyId, getUserByEmail} = require('../database/service/userService')
const { hashPassword } = require('../auth/utils')
//const {} to } = require('await-to-js')
router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        res.json(users)
    })
})
router.post('/', async (req, res) => {
    let body;
    const {email, firstName, lastName, password} = req.body;
    if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
        return res.status(500).json({ success: false, data: 'Enter a valid email address.' })
      } else if (password.length < 5 || password.length > 20) {
        return res.status(500).json({
          success: false,
          data: 'Password must be between 5 and 20 characters.'
        })
      }
    
    
      let emailTaken = await getUserByEmail(email)
   
    if (emailTaken){
      return res.status(500).json({
        success: false,
        data: 'There is an account with that email.'
      })
    }
   
    let user = new UserModel({
        email,
        firstName,
        lastName,
        password :await hashPassword(password)
    })/*
    user.save((err, result) => {
        if (err){
            return res.status(500).json({ success: false, data: err })
        }
        else{
          console.log(result)
        }

    })*/
    user.save().then(result => {
    res
    .status(200)
    /*.cookie('jwt', token, {
      httpOnly: true
    })*/
    .json({
      success: true,
      data: result
    })
    }).catch(err => {
     res
    .status(500)
    /*.cookie('jwt', token, {
      httpOnly: true
    })*/
    .json({
      success: false,
      data: err
    })
    })
    
})

router.use('/:id', (req, res, next) => {
    console.log(req.params.id)
    User.findById(req.params.id, (err, photo) => {
        if(err)
            res.status(500).send(err)
        else 
            req.photo = photo 
            next()
    })
})
router
    .get('/:id', (req, res) => {
        return res.json( req.photo )
    })
    .put('/:id', (req, res) =>{
        Object.keys(req.body).map(key=>{
            req.photo[key] = req.body[key]
        })
        req.photo.save()
        res.json(req.photo)
    })
module.exports = router;
