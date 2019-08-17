const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Institutions = require('../models/Institution');
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
        //let criteria = {user: req.query.user};
        let institutions = await Institutions.find();

        if (institutions) return res.send(institutions);
        //     else return res.sendStatus(404);
        // if (req.query.user) {
        //     institutions = await Recipe.find();
        //
        //     if (institutions) return res.send(institutions);
        //     else return res.sendStatus(404);
        // } else {
        //
        //     if (!req.user) {
        //         institutions = await Cocktail.find({published: true});
        //     } else if (req.user.role === 'admin') {
        //         institutions = await Cocktail.find();
        //     } else {
        //         institutions = await Cocktail.find({published: true});
        //     }
        //     if (institutions) return res.send(institutions);
        //     else return res.sendStatus(500);
        // }
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.get('/:id', (req, res) => {

    const criteria = {_id: req.params.id};
    Institutions.findOne(criteria).then(institution => {
        if (institution) res.send(institution);
        else res.sendStatus(404);
    }).catch(() => res.sendStatus(500));
});


router.post('/', [auth, upload.single('image')], (req, res) => {
    let institutionData = req.body;
    try {
        institutionData.ingredients = JSON.parse(req.body.ingredients);
    } catch (e) {
        console.log('this is error : ', e);

    }
    if (req.file) {
        institutionData.image = req.file.filename;
    }
    institutionData.user = req.user._id;

    const institution = new Cocktail(institutionData);
    institution.save()
        .then(() => res.send({message: 'Ok'}))
        .catch(error => res.status(400).send(error));
});

// router.post('/:id/add_image', auth, async (req, res) => {
//     console.log(req.params.id);
//     const recipe = await Recipe.findById(req.params.id);
//
//     if (!recipe) {
//         return res.sendStatus(404);
//     }
//     if (req.file) {
//         recipe.image = recipe.image.push(req.file.filename);
//     }
//
//     await recipe.save();
//
//     const institutions = await Recipe.find();
//     return res.send("ok");
// });

router.delete('/', [auth, permit('admin')], async (req, res) => {
    try {
        const id = req.query.id;
        const institution = await Institutions.findById(id);

        if (institution) {
            await institution.remove();
            const institutions = await Institutions.find();
            return res.status(200).send(institutions);
        } else {
            return res.status(400).send('Not found !');
        }

    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;