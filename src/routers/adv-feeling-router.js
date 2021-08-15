const express = require('express');
const xss = require('xss');
const AdvFeelingService = require('../services/adv-feeling-service');

const advFeelingRouter = express.Router();

advFeelingRouter
    .route('/')
    .get((req, res, next) => {
        AdvFeelingService.getAdvFeelings(req.app.get('db'))
            .then(adv_feelings => {
                res.json(adv_feelings)
            })
            .catch(next)
    })

advFeelingRouter
    .route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        AdvFeelingService.getById(req.app.get('db'), id)
            .then(adv_feeling => {
                (!adv_feeling)
                    ? res.status(404).json({ error: { message: 'This advanced feeling does not exist'}})
                    : res.json({
                        id: adv_feeling.id,
                        name: xss(adv_feeling.name),
                        main_feeling: xss(adv_feeling.main_feeling),
                        color: xss(adv_feeling.color)
                    })
            })
            .catch(next)
    })

advFeelingRouter
    .route('/feeling/:mainFeelingId')
    .get((req, res, next) => {
        const { mainFeelingId } = req.params;

        AdvFeelingService.getByMainFeeling(req.app.get('db'), mainFeelingId)
            .then(adv_feelings => {
                (!adv_feelings)
                    ? res.status(404).json({ error: { message: 'There are no feelings that meet this criteria'}})
                    : res.json(adv_feelings)
            })
            .catch(next)
    })

module.exports = advFeelingRouter;