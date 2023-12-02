require("dotenv").config();
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");

let s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  //   sslEnabled: false,
  //   s3ForcePathStyle: true,
  //   signatureVersion: "v4",
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      //   acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];

        cb(null, `file-${Date.now()}.${ext}`);
      },
    }),
  });

module.exports = { upload };
