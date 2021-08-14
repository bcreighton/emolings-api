const express = require('express');
const xss = require('xss');
const IdentifierService = require('../services/identifier-service');

const identifierRouter = express.Router();

identifierRouter
    .route('/')
    .get((req, res, next) => {
        IdentifierService.getIdentifiers(req.app.get('db'))
            .then(identifiers => {
                res.json(identifiers)
            })
            .catch(next)
    })

identifierRouter
    .route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        IdentifierService.getById(req.app.get('db'), id)
            .then(identifier => {
                (!identifier)
                    ? res.status(404).json({ error: { message: 'Identifier does not exist'}})
                    : res.json({
                        id: identifier.id,
                        identifier: xss(identifier.identifier),
                        type: xss(identifier.type)
                    })
            })
            .catch(next)
    })

identifierRouter
    .route('/type/:type')
    .get((req, res, next) => {
        const { type } = req.params;

        IdentifierService.getByType(req.app.get('db'), type)
            .then(identifiers => {
                (!identifiers)
                    ? res.status(404).json({ error: { message: 'There are no identifiers with this type'}})
                    : res.json(identifiers)
            })
            .catch(next)
    })

module.exports = identifierRouter;