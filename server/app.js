var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var tesseract = require('node-tesseract');

var fileuploaded;

app.use(express.static('../client'));
app.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        fileuploaded = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
    }
});

var upload = multer({storage: storage}).single('file');

app.post('/upload', function(req, res) {
   upload(req,res,function(err){
       if(err){
           res.json({error_code:1,err_desc:err});
           return;
       }
       res.json({error_code:0,err_desc:null});
    });
});

app.get('/text',function (req,res) {
  console.log("Converting to text");
  console.log(fileuploaded);
  console.log(req.body);
  tesseract.process(__dirname + '/uploads/' + fileuploaded,function(err, text) {
      if(err) {
            console.error(err);
      }
      else {
            res.json(text);
            console.log(text);
      }
  });
});

app.listen('3000', function(){
   console.log('Server started on http://localhost:3000/');
});