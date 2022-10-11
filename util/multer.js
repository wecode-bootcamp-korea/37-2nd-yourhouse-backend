// const express = require('express');
const multer = require('multer');
const path = require('path');
// const fs = require('fs');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
// const pool = require("../../config/database");
// const { creatPost } = require("./postingController");
// let router = require('express').Router();

// let address;
// let uuid = require('uuid/v4');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region:'ap-northeast-1',
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    acl: 'public-read',
    bucket: 'bucket-pien6',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});


module.exports = upload