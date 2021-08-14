const FeelingService = {
    getFeelings(knex) {
        return knex
            .from('feelings')
            .select('*')
    },

    getById(knex, id) {
        return knex('feelings')
            .from('feelings')
            .where('feelings.id', id)
            .first()
    }
};

module.exports = FeelingService;