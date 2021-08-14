const FeelingService = {
    getFeelings(knex) {
        return knex
            .from('feeling')
            .select('*')
    },

    getById(knex, id) {
        return knex('feeling')
            .from('feeling')
            .where('feeling.id', id)
            .first()
    }
};

module.exports = FeelingService;