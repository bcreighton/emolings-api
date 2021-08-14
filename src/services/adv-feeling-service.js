const AdvFeelingService = {
    getAdvFeelings(knex) {
        return knex
            .from('adv_feeling')
            .select('*')
    },

    getById(knex, id) {
        return knex
            .from('adv_feeling')
            .where('adv_feeling.id', id)
            .first()
    },

    getByMainFeeling(knex, main_feeling) {
        return knex
            .from('adv_feeling')
            .where('adv_feeling.main_feeling', main_feeling)
    }
}

module.exports = AdvFeelingService;