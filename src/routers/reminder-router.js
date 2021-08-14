const express = require('express');
const xss = require('xss');
const ReminderService = require('../services/reminder-service');

const reminderRouter = express.Router();

reminderRouter
    .route('/')
    .get((req, res, next) => {
        ReminderService.getReminders(req.app.get('db'))
            .then(reminders => {
                res.json(reminders)
            })
            .catch(next)
    })

reminderRouter
    .route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        ReminderService.getById(req.app.get('db'), id)
            .then(reminder => {
                (!reminder)
                    ? res.status(404).json({error: { message: 'This reminder does not exist'}})
                    : res.json({
                        id: reminder.id,
                        reminder: reminder.reminder
                    })
            })
            .catch(next)
    })

module.exports = reminderRouter;