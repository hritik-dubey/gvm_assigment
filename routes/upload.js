// routes/upload.js
const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");

router.post("/upload", uploadController.uploadMiddleware, async (req, res) => {
    try {
        const cloudinaryUrls = await Promise.all(
            req.files.map((file) => uploadController.uploadToCloudinary(file))
        );

        const s3Urls = await Promise.all(
            req.files.map((file) => uploadController.uploadToS3(file))
        );

        res.json({
            cloudinaryUrls,
            s3Urls,
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
