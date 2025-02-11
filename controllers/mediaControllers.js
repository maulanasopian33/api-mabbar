const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const db = require('../models');
const jwt = require('jsonwebtoken');

const createThumbnail = async (req, res) => {
    try {
        const { filename: image, originalname } = req.file;
        const thumbnailName = `${originalname}`;
        const thumbnailPath = `public/images/thumbnails/${thumbnailName}`;

        // Membuat folder thumbnails jika belum ada
        if (!fs.existsSync('public/images/thumbnails')) {
            fs.mkdirSync('public/images/thumbnails');
        }

        // Membuat thumbnail dengan sharp
        await sharp(req.file.path)
            .resize(400) // Ukuran thumbnail yang diinginkan
            .toFile(thumbnailPath);

        return thumbnailPath
    } catch (error) {
        return new Error('Cannot create thumbnail')
    }
};

exports.store = async (req, res) => {
    // console.log(req.file)
    try {
        const token = req.params.id
        const decoded = jwt.verify(token, 'mabbar');
        const thumbnail = await createThumbnail(req, res);
        const normalpath = req.file.path.replace(/\\/g, '/')
        const path = normalpath.replace("public/", '')
        const fileData = {
            filename: req.file.filename,
            path,
            user_id: decoded.userId,
            thumbnail: thumbnail.replace('public/', '')
        };

        const newFile = await db.media.create(fileData);
        console.log(newFile)
        return res.json({
            status: true,
            message: 'File uploaded successfully',
            data: newFile
        })
    }catch (error) {
        return res.json({
            status: false,
            message: 'Failed to upload file',
            error
        })
    }
}

exports.get = async (req, res) => {
    try {
        const token = req.params.id
        const decoded = jwt.verify(token, 'mabbar');
        const data = await db.media.findAll({
            where: {
                user_id: decoded.userId
            }
        })
        res.json({
            status : true,
            data
        })
    } catch (error) {
        res.json({
            status : false,
            error
        })
    }
}
const uploadDir = path.join( "public","signature");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

exports.signature = async (req, res) => {
    try {
        const { image, type, id } = req.body;
        if (!image) return res.status(400).json({ error: "No image provided" });
    
        // Extract format & data dari Base64
        const matches = image.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!matches) return res.status(400).json({ error: "Invalid Base64 format" });
    
        const ext = matches[1]; // Format file (png, jpg, jpeg, dll)
        const base64Data = matches[2]; // Data base64
    
        // Buat buffer dari Base64
        const buffer = Buffer.from(base64Data, "base64");
    
        // Buat nama file unik
        const filename = `${type}-${id}.${ext}`;
        const filepath = path.join(uploadDir, filename);
    
        // Simpan file ke server
        fs.writeFileSync(filepath, buffer);
    
        res.json({ status : true, message: "Upload successful", filename });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
