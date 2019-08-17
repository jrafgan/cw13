const express = require('express');
const config = require('../config');
const Rating = require('../models/Rating');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

router.get('/', async (req, res) => {
    try {
        let criteria = {institution: req.query.institution};
        let ratings;

        if (req.query.institution) {
            ratings = await Rating.find(criteria).populate("user");

            if (ratings) return res.send(ratings);
            else return res.sendStatus(404);
        }

        ratings = await Rating.find().populate("institution").populate("user");

        if (ratings) return res.send(ratings);
        else return res.sendStatus(404);

    } catch (e) {
        return res.status(500).send(e);
    }
});

router.get('/:id', (req, res) => {

    const criteria = {recipe: req.params.id};
    Rating.find(criteria).populate("user").populate("institution").then(rating => {
        if (rating) res.send(rating);
        else res.sendStatus(404);
    }).catch(() => res.sendStatus(500));
});


router.post('/', auth, (req, res) => {
    let ratingData = req.body;

    ratingData.user = req.user._id;

    const rating = new Rating(ratingData);
    rating.save()
        .then(() => res.send({message: 'Ok'}))
        .catch(error => res.status(400).send(error));
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
    try {
        const id = req.query.id;
        const rating = await Rating.findById(id);

        if (rating) {
            await rating.remove();
            return res.status(200).send({message: "Ok"});
        } else {
            return res.status(400).send('Not found !');
        }

    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;