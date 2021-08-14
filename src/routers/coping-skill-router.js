const express = require('express');
const xss = require('xss');
const CopingSkillService = require('../services/coping-skill-service');

const copingSkillRouter = express.Router();

copingSkillRouter
    .route('/')
    .get((req, res, next) => {
        CopingSkillService.getCopingSkills(req.app.get('db'))
            .then(coping_skills => {
                res.json(coping_skills)
            })
            .catch(next)
    })

copingSkillRouter
    .route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        CopingSkillService.getById(req.app.get('db'), id)
            .then(coping_skill => {
                (!coping_skill)
                    ? res.status(404).json({ error: { message: 'This coping skill does not exist'}})
                    : res.json({
                        id: coping_skill.id,
                        child: xss(coping_skill.child),
                        parent: xss(coping_skill.parent),
                        main_feeling: coping_skill.main_feeling
                    })
            })
            .catch(next)
    })

copingSkillRouter
    .route('/feeling/:main_feeling')
    .get((req, res, next) => {
        const { main_feeling } = req.params;

        CopingSkillService.getByMainFeeling(req.app.get('db'), main_feeling)
            .then(coping_skills => {
                (!coping_skills)
                    ? res.status(404).json({ error: { message: 'There are no coping skills that meet this criteria'}})
                    : res.json(coping_skills)
            })
            .catch(next)
    })

module.exports = copingSkillRouter;