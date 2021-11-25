const router = require('express').Router();
const User = require('../models/User');
const Closet = require('../models/Closet');

// Create
router.post('/', async (req, res) => {
    const newCloset = new Closet(req.body);
    try {
        const savedCloset = await newCloset.save();
        res.status(200).json(savedCloset);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update

router.put('/:id', async (req, res) => {
    try {
        const closet = await Closet.findById(req.params.id);
        if (closet.email === req.body.email) {
            try {
                const updatedCloset = await Closet.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedCloset);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('You do not have permission for this action!');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const closet = await Closet.findById(req.params.id);
        if (closet.email === req.body.email) {
            try {
                await closet.delete();
                res.status(200).json(
                    'Your closet has been deleted and removed from our database!'
                );
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('You do not have permission for this action!');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get
router.get('/:id', async (req, res) => {
    try {
        const closet = await Closet.findById(req.params.id);
        res.status(200).json(closet);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all closets
router.get('/', async (req, res) => {
    const email = req.query.user;
    const catName = req.query.cat;
    try {
        let closets;
        if (email) {
            closets = await Closet.find({ email });
        } else if (catName) {
            closets = await Closet.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            closets = await Closet.find();
        }
        res.status(200).json(closets);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
