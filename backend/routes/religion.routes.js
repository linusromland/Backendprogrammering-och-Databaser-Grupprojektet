const express = require('express');
const router = express.Router();

const ReligionModel = require('../models/Religion');

router.get('/', async (req, res) => {
    const allReligions = await ReligionModel.findAll({});
    res.json({
        religions: allReligions,
    });
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name && name.length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a name',
        });
    }
    try {
        const savedReligion = await ReligionModel.create({
            religionName: name,
        });
        res.status(201).json({ success: true, error: '', data: savedReligion });
    } catch (error) {
        //If error is same name, return error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The religion ${name} already exists.`,
            });
        }
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;