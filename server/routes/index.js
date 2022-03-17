const express = require('express')
const router = express.Router()
const Photos = require('../database/models/photoModel')

router.get('/', (req, res) => {
    Photos.find({}, (err, photos) => {
        res.json(photos)
    })
})
router.post('/', (req, res) => {
    const data = req.body
    let photo = new Photos({
        ...data
    })
    photo.save((err, res) => {
        if (err){
            console.log(err);
        }
        else{
            console.log(res)
        }

    })
    return res
    .status(200)
    /*.cookie('jwt', token, {
      httpOnly: true
    })*/
    .json({
      success: true,
      data: '/'
    })
})

router.use('/:id', (req, res, next) => {
    console.log(req.params.id)
    Photos.findById(req.params.id, (err, photo) => {
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
