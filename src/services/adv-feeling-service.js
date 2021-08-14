const AdvFeelingService = {
    getAdvFeelings(knex) {
        return knex
            .from('adv_feeling')
            .join('feeling', 'feeling.id', 'adv_feeling.main_feeling')
            .select(
                knex.ref('adv_feeling.id').as('id'),
                knex.ref('adv_feeling.name').as('name'),
                knex.ref('feeling.name').as('main_feeling')
            )
    },

    getById(knex, id) {
        return knex ('adv_feeling')
            .leftOuterJoin('feeling', 'feeling.id', 'adv_feeling.main_feeling')
            .where('adv_feeling.id', id)
            .first()
            .select(
                'adv_feeling.id AS id',
                'adv_feeling.name AS name',
                'feeling.name AS main_feeling'
            )
    },

    getByMainFeeling(knex, main_feeling) {
        return knex
            .from('adv_feeling')
            .leftOuterJoin('feeling', 'feeling.id', 'adv_feeling.main_feeling')
            .where('adv_feeling.main_feeling', main_feeling)
            .select(
                'adv_feeling.id AS id',
                'adv_feeling.name AS name',
                'feeling.name AS main_feeling'
            )
    }
}

module.exports = AdvFeelingService;