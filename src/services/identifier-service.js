const IdentifierService = {
    getIdentifiers(knex) {
        return knex
            .from('identifier')
            .select('*')
    },

    getById(knex, id) {
        return knex('identifier')
            .from('identifier')
            .where('identifier.id', id)
            .first()
    },

    getByType(knex, type) {
        return knex('identifier')
            .from('identifier')
            .where('identifier.type', type)
    }
}

module.exports = IdentifierService;