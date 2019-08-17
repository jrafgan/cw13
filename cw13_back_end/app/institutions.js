const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Institution = require('../models/Institution');
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
        let institutions = await Institution.find();

        if (institutions) return res.send(institutions);
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.get('/:id', (req, res) => {

    const criteria = {_id: req.params.id};
    Institution.findOne(criteria).then(institution => {
        if (institution) res.send(institution);
        else res.sendStatus(404);
    }).catch(() => res.sendStatus(500));
});


router.post('/', [auth, upload.single('image')], (req, res) => {
    console.log(req.body);
    let institutionData = req.body;
    try {

    } catch (e) {
        console.log('this is error : ', e);

    }

    const institution = new Institution({
        title: institutionData.title,
        description: institutionData.description,
        user: institutionData.user,
        image: req.file.filename

    });
    institution.save()
        .then(() => res.send({message: 'Ok'}))
        .catch(error => res.status(400).send(error));
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
    try {
        const id = req.query.id;
        const institution = await Institution.findById(id);

        if (institution) {
            await institution.remove();
            const institutions = await Institution.find();
            return res.status(200).send(institutions);
        } else {
            return res.status(400).send('Not found !');
        }

    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;