const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Image = require('../models/Image');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const tryAuth = require('../middleware/tryAuth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', tryAuth, async (req, res) => {
    try {
        console.log(req.query.params);
        let images;

        let criteria = {institution: req.query.institution};

        if (req.query.institution) {
            images = await Image.find(criteria);

            if (images) return res.send(images);
            else return res.sendStatus(404);
        }

        images = await Image.find();

        if (images) {
            return res.send(images);
        } else {
            return res.sendStatus(404);
        }

    } catch (e) {
        return res.status(500).send(e);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        let imageData = req.body;

    if (req.file) {
        imageData.image = req.file.filename;
    }
    imageData.institution = req.body.institution;

    const image = new Image(imageData);
    await image.save();
    const images = await Image.find();
        if (images) {
            res.send(images)
        } else {
            return res.status(400).send('Not found !');
        }
    } catch (error) {
        return res.status(400).send(error)
    }
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
    try {
        const id = req.query.id;
        const image = await Image.findById(id);

        if (image) {
            await image.remove();
            const images = await Image.find();
            return res.status(200).send(images);
        } else {
            return res.status(400).send('Not found !');
        }

    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;