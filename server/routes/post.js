const express = require('express')
const router = express.Router()
const Post = require('../database/models/PostModel')
const {getUserById, getUserByEmail} = require('../database/service/userService')
const upload = require('../media/upload')
var fs = require('fs');
var path = require('path');
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../auth/utils')
router.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        res.json(posts)
    })
})
router.post('/', upload.single('image'), async (req, res) => {
    
    const { title, description} = req.body;
    const decodedToken = verifyToken(req)
    const userId = decodedToken.user._id
    let author = await getUserById(userId);
    console.log(author)
    const image = req.file.filename
    let post = new Post({
        author,
        title,
        description,
        image 
    })
    post.save().then(result => {
      res
      .status(200)
      .json({
        success: true,
        data: result
      })
    }).catch(err => {
     res
      .status(500)
      
      .json({
        success: false,
        data: err
      })
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
            .json({
              success: true,
              data: result
            })
            }).catch(err => {
                return res
            .status(500)
            .json({
              success: false,
              data: err
            })
            });
    })
    .put('/:id', upload.single('image'), async (req, res) =>{
        
        const _id = req.params.id
        const {userId, title, description} = req.body;
        const image = req.file.filename;
        let author = await getUserById(userId);
        Post.findOneAndUpdate({ _id }, 
            {author,
                title,
                description,
                image }, null,) .then(result => {
                    res
                    .status(200)
                    .json({
                      success: true,
                      data: result
                    })
                    }).catch(err => {
                        return res
                    .status(500)
                    .json({
                      success: false,
                      data: err
                    })
                    });
        
    })
    .delete('/:id',async(req, res) => {
      const _id = req.params.id
      Post.deleteOne({_id}).then(result => {
        res
        .status(200)
        
        .json({
          success: true,
          data: result
        })
        }).catch(err => {
            return res
        .status(500)
       
        .json({
          success: false,
          data: err
        })
        });
    })
module.exports = router;
