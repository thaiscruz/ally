const express = require('express');
const fs = require('fs');
const router = express.Router({mergeParams: true});
const {ensureAuthenticated} = require('../Config/auth');
const multer = require('multer');
const {videoUpload} = require('../Controllers/videoUpload')
const path = require('path');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const keys = require('../Config/keys');
const Video = require('../Models/Video');

//Servidor local
 const storage = multer.diskStorage({
     destination:(req,file,cb)=>{
         cb(null,'Uploads/Videos')
     },
     filename:(req,file,cb)=>{
         const ext =file.originalname
         console.log(ext)
         const filePath =`/Videos/${ext}`
         Video.create({filePath,user:req.user._id}).then(()=>{
             cb(null,file.originalname)
         }).catch(err=>{
             console.log(err)
         })
     }
 })
const upload = multer({storage})


//AWS S3
//  const s3 = new aws.S3({apiVersion:'2006-03-1'})
//  s3.config.update({
//     secretAccessKey:keys.S3_KEY_SECRET ,
//     accessKeyId: keys.S3_KEY_ID,
//     region: 'sa-east-1'
// });

//  const upload = multer(
//      {storage:multerS3({
//          acl: 'public-read',
//          s3:s3,
//          bucket:'allyvideos',
//          metadata:(req,file,cb)=>{
//              cb(null,{fieldName:file.fieldname})
//          },
//          key:(req,file,cb)=>{
//              cb(null,file.originalname)
//          }
//      })}
//      )

router.post('/',ensureAuthenticated,upload.single('video'),videoUpload)
module.exports = router;