const express = require('express');
const xss = require('xss');
const FeelingService = require('../services/feelings-service');

const feelingRouter = express.Router();

feelingRouter
    .route('/')
    .get((req, res, next) => {
        
        FeelingService.getFeelings(req.app.get('db'))
            .then(feelings => {
                res.json(feelings)
            })
            .catch(next)
    })

feelingRouter
    .route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        FeelingService.getById(req.app.get('db'), id)
            .then(feeling => {
                (!feeling)
                    ? res.status(404).json({error: { message: 'Feeling does not exist'}})
                    : res.json({
                        id: feeling.id,
                        name: xss(feeling.name)
                    })
            })
            .catch(next)
    })

module.exports = feelingRouter;