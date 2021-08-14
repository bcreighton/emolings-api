const express = require('express');
const xss = require('xss');
const UserTypeService = require('../services/user-type-service');

const userTypeRouter = express.Router();

userTypeRouter
    .route('/')
    .get((req, res, next) => {
        UserTypeService.getUserTypes(req.app.get('db'))
            .then(user_types => {
                res.json(user_types)
            })
            .catch(next);
    })

userTypeRouter
    .route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        UserTypeService.getById(req.app.get('db'), id)
            .then(user_type => {
                (!user_type) 
                ? res.status(404).json({error: { message: 'User Type does not exist'}})
                : res.json({
                    id: user_type.id,
                    userType: xss(user_type.user_type),
                })
            })
            .catch(next)
    })

module.exports = userTypeRouter;