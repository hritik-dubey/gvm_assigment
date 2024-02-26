const cloudinary = require("cloudinary");
const AWS = require("aws-sdk");
const multer = require("multer");
const Q = require("q");

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Function to upload file to Cloudinary
function uploadToCloudinary(file) {
    return new Q.Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file.path,
            { resource_type: "auto", flags: "attachment" },
            (err, res) => {
                if (err) {
                    console.error("Cloudinary upload error:", err);
                    reject(err);
                } else {
                    console.log("Cloudinary upload success:", res);
                    resolve(res.secure_url);
                }
            }
        );
    });
}

// Function to upload file to AWS S3
function uploadToS3(file) {
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
    };

    return new Q.Promise((resolve, reject) => {
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                console.error("AWS S3 upload error:", err);
                reject(err);
            } else {
                console.log("AWS S3 upload success:", data);
                resolve(data.Location);
            }
        });
    });
}

// Multer setup for handling file uploads
const upload = multer({
    storage: multer.memoryStorage(),
});

module.exports = {
    uploadToCloudinary,
    uploadToS3,
    uploadMiddleware: upload.array("files"),
};
