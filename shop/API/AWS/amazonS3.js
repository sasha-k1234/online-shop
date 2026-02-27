//import { createInterface } from "node:readline/promises";

const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const {getSignedUrl} = new require('@aws-sdk/s3-request-presigner');

const { Readable } = require("stream");
const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: "AKIA34AMCXGSDUZMAVN2",
    secretAccessKey: "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",
  },
});



const bucketName = "sashales";

module.exports = class AmazonS3 {
  async saveFile(filename, fileBuffer) {


    await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketName,
            Key: filename,
            Body: fileBuffer.data 
          })
        );
        // const upload = s3Stream.upload({
        //   Bucket: bucketName,
        //   Key: filename,
        //   Body:fileBuffer
        // });
        // upload.maxPartSize(20971520);
  }

  async getFile(filename) {
    const { Body } = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: filename,
      })
    );
    return Body;
  }

  async getFileUrl(filename,expires = null){
    const command = new GetObjectCommand({Bucket:bucketName,Key:filename});
    return await getSignedUrl(s3Client,command,{expiresIn:expires});
  }
};


