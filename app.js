var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var tesseract = require('node-tesseract');
var jimp = require('jimp');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var fileuploaded;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
//  console.log("Converting to text");
//  console.log(fileuploaded);
    var jimppath = __dirname + '/uploads/' + fileuploaded;

    jimp.read(jimppath).then(function (lenna) {
//      console.log("jimp started");
        lenna
            .resize(400, 400)           // Rescaling
            .quality(100)               // Quality
            .greyscale()                // Binarisation
            .brightness(0)              // Noise Removal
            .exifRotate()               // Rotation / Deskewing
//          .autocrop(0,0)            // tried for border removal, could not see difference
            .write(__dirname + '/uploads/' + fileuploaded );// save

        tesseract.process(__dirname + '/uploads/' + fileuploaded,function(err, text) {
            if(err) {
                console.error(err);
            }
            else {
                res.json(text);
                console.log(text);
            }
        });
//      console.log("jimp executed");
    }).catch(function (err) {
        console.error(err);
    });

    console.log(req.body);

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("Server running at http://localhost:3000/");

module.exports = app;
