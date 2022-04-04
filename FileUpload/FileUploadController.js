var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');
var busboy = require('connect-busboy');
var fileUpload = require('./FileUpload');
var fs = require('fs');
const uuidv4 = require("uuid")

router.use(fileupload());
router.use(busboy());

router.get('/:id', function (req, res) {
    var id = req.params.id
    console.log(__dirname)
    res.sendFile(process.cwd() + '/Assets/' + id +".jpg", function(err){
        if(err){
            console.log(err);
        }else{
            console.log("file sent")
        }
    })
})

router.post('/', function (req, res) {
    console.log(req.files)
    if (req.files.file != null) {
        var fileId = uuidv4.v4() + ".jpg";
        console.log(fileId)
        fs.writeFile('./Assets/' + fileId, req.files.file.data, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            } else {
                return res.status(200).send({ fileId: fileId });
            }
        })
    } else {
        return res.status(400).send({ "error": "No file provided" })
    }
});

module.exports = router;