const express = require('express');
const xss = require('xss');
const SeverityService = require('../services/severity-service');

const severityRouter = express.Router();

severityRouter
    .route('/')
    .get((req, res, next) => {
        SeverityService.getSeverities(req.app.get('db'))
            .then(severities => {
                res.json(severities)
            })
            .catch(next)
    })

severityRouter
    .route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        SeverityService.getById(req.app.get('db'), id)
            .then(severity => {
                (!severity)
                    ? res.status(404).json({ error: { message: 'This severity does not exist'}})
                    : res.json({
                        id: severity.id,
                        level: severity.level
                    })
            })
            .catch(next)
    })

module.exports = severityRouter;