const FaqService = {
    getFaqs(knex) {
        return knex
            .from('faq')
            .select('*')
    }
}

module.exports = FaqService;