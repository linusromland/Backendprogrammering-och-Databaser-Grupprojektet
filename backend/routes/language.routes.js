const express = require('express');
const router = express.Router();

const LanguageModel = require('../models/Language');

/**
 * @api {post} /api/language/ Create a new language
 */
router.post('/', async (req, res) => {
    if (!req.body.languageName && req.body.languageName.length < 1) {
        return res.status(400).json({
            success: false,
            message: 'languageName is required and must be at least 1 characters long.',
        });
    }

    if (!req.body.languageNativeSpeakers) {
        return res.status(400).json({
            success: false,
            message: 'languageNativeSpeakers is required.',
        });
    }

    if (!req.body.languageTotalSpeakers) {
        return res.status(400).json({
            success: false,
            message: 'languageTotalSpeakers is required.',
        });
    }

    try {
        const language = await LanguageModel.create({
            languageName: req.body.languageName,
            languageNativeSpeakers: req.body.languageNativeSpeakers,
            languageTotalSpeakers: req.body.languageTotalSpeakers,
        });
        res.status(201).json({
            success: true,
            error: '',
            data: language,
        });
    } catch (error) {
        //If error is same name, return error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: 'languageName already exists.',
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;