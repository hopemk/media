const express = require('express')
const router = express.Router()
var fs = require('fs');
var path = require('path');

router.get('/:fileName', (req, res, next) => {
    console.log('fileController.download: started')
    const path = req.params.fileName
    const file = fs.createReadStream('uploads/' + path)
    const filename = (new Date()).toISOString()
    res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"')
    file.pipe(res)
  })

module.exports = router