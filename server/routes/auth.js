const express = require('express')
const router = express.Router()
const Post = require('../database/models/PostModel')
const {getUserById, getUserByEmail} = require('../database/service/userService')
const { hashPassword } = require('../auth/utils')
//const {getUserbyId, getUserByEmail} = require('../database/service/userService')
//const {} to } = require('await-to-js')
router.post('/login', async (req, res) => {
    const { email, password } = req.body
      const user = await getUserByEmail(email)
    
    const authenticationError = () => {
      return res
        .status(500)
        .json({ success: false, data: "Authentication error!" })
    }
    if(!(user)){
        return authenticationError()
    }
    if (!(await verifyPassword(password, user.password))) {
      console.error('Passwords do not match')
      return authenticationError()
    }
  
    const [loginErr, token] = await login(req, user)
  
    if (loginErr) {
      console.error('Log in error', loginErr)
      return authenticationError()
    }
    console.log("toekn")
    console.log(token)
  
    return res
      .status(200)
      .cookie('jwt', token, {
        httpOnly: false
      })
      .json({
        success: true,
        data: token
      })   
      })
  
router.use('/:id', (req, res, next) => {
    console.log(req.params.id)
    Post.findById(req.params.id, (err, photo) => {
        if(err)
            res.status(500).send(err)
        else 
            req.photo = photo 
            next()
    })
})
router
    .get('/:id', (req, res) => {
        const id = req.params.id
        Post.findById(id).then(result => {
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
                return res
            .status(500)
            /*.cookie('jwt', token, {
              httpOnly: true
            })*/
            .json({
              success: false,
              data: err
            })
            });
    })
    .put('/:id', async (req, res) =>{
        ///let post = {...req.body}
        const _id = req.params.id
        const {userId, title, description, image} = req.body;
        let author = await getUserById(userId);
        Post.findOneAndUpdate({ _id }, 
            {author,
                title,
                description,
                image }, null,) .then(result => {
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
                        return res
                    .status(500)
                    /*.cookie('jwt', token, {
                      httpOnly: true
                    })*/
                    .json({
                      success: false,
                      data: err
                    })
                    });
        /*
        Object.keys(req.body).map(key=>{
            req.photo[key] = req.body[key]
        })
        req.photo.save()
        */
        //res.json("done")
    })
module.exports = router;
