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
        // else {
        //
        //     if (!req.user) {
        //         images = await Image.find({published: true});
        //     } else if (req.user.role === 'admin') {
        //         images = await Image.find();
        //     } else {
        //         images = await Image.find({published: true});
        //     }
        //     if (images) return res.send(images);
        //     else return res.sendStatus(500);
        // }
    } catch (e) {
        return res.status(500).send(e);
    }
});

// router.get('/:id', (req, res) => {
//
//     const criteria = {recipe: req.params.id};
//     Image.find(criteria).then(images => {
//         if (images) res.send(images);
//         else res.sendStatus(404);
//     }).catch(() => res.sendStatus(500));
// });


router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        let imageData = req.body;
    // try {
    //     imageData.ingredients = JSON.parse(req.body.ingredients);
    // } catch (e) {
    //     console.log('this is error : ', e);
    //
    // }
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

// router.post('/:id/add_image', auth, async (req, res) => {
//     console.log(req.params.id);
//     const institution = await Image.findById(req.params.id);
//
//     if (!institution) {
//         return res.sendStatus(404);
//     }
//     if (req.file) {
//         institution.image = institution.image.push(req.file.filename);
//     }
//
//     await institution.save();
//
//     const images = await Image.find();
//     return res.send("ok");
// });

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