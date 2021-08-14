const SeverityService = {
    getSeverities(knex) {
        return knex
            .from('severity')
            .select('*')
    },

    getById(knex, id) {
        return knex
            .from('severity')
            .where('severity.id', id)
            .first()
    }
}

module.exports = SeverityService;