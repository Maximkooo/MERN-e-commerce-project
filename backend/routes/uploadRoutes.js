import AWS from 'aws-sdk'
import multer from "multer";
import express from "express";
import env from "dotenv"
env.config()


const router = express.Router();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
})



const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const fileName = `${Date.now()}_${req.file.originalname}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: imageBuffer,
      ContentType: req.file.mimetype,
    };
    // const params2 = {
    //   Bucket: process.env.AWS_BUCKET_NAME,
    //   Key: fileName,
    // };

    await s3.upload(params).promise();

    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3-${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // const data = await s3.getObject(params2).promise();
    // res.setHeader('Content-Type', data.ContentType);
    // console.log(data);
    // res.send(data.Body);

    res.send({
      "message": "Image uploaded successfully",
      "image": imageUrl
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error upload');
  }
});

export default router;