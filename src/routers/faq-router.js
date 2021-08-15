const express = require('express');
const FaqService = require('../services/faq-service');

const faqRouter = express.Router();

faqRouter
    .route('/')
    .get((req, res, next) => {
        FaqService.getFaqs(req.app.get('db'))
            .then(faqs => {
                res.json(faqs)
            })
    })

module.exports = faqRouter;