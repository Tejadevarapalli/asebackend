var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var Dir=''
var md= require('mkpath');
var fs=require('file-system');
var fs1=require('fs');
//var zip=require('zip-folder');
var Archiver=require('archiver');
 var store = multer.diskStorage({
     destination: function(req,file,cb){
 console.log(Dir);
         cb(null,path.resolve(__dirname, './upload/'));
     },
     filename:function(req,file,cb){
         cb(null,file.originalname);
     }
 });

var upload = multer({storage: store}).single('file');

_router.post('/upload',function(req,res){
         upload(req, res, function (err) {
             console.log('checkpoint2');
             if (err) {
                 return res.status(501).json({error: err});
             }
             // console.log( upload)
             //do all database record saving activity
             console.log('filename new', req.file.filename);
             return res.json({originalname: req.file.originalname, uploadname: req.file.filename});
         });
});




_router.post('/movefile',function (req,res) {
    let userfolder=req.body.username;
    let projectfolder=req.body.projectname;
     Dir='/uploads/'+ userfolder +'/'+ projectfolder;
     let dirpath=path.join(__dirname,Dir);
      md(dirpath,function (err) {
          if (err) throw err;
          console.log('directory created');
          let source = path.join(__dirname + '/upload/');
          fs.copySync(source,dirpath);
          fs1.unlinkSync(__dirname+'/upload/'+req.body.filename);
      });
     return res.json('move done');
});


// _router.post('/download', function(req,res,next){
//
//     let filepath = path.join(__dirname,'./uploads' +'/'+req.body.user+'/' + req.body.projecttitle);
//     zip(filepath,filepath+'.zip',function(err){
//         if(err){
//             console.log('unable to zip');
//         }
//         else{
//             console.log('zip done');
//         }
//     });
//     return res.sendFile(filepath);
// });

_router.get('/download/:user/:id', (req, response) => {

    response.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename='+req.params.id+'.zip'
    });
    var zip = Archiver('zip');
    zip.pipe(response);
    zip.directory('../uploads/'+req.params.user+'/'+req.params.id, false)
        .finalize();
});


module.exports = _router;
