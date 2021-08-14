const UserTypeService = {
    getUserTypes(knex) {
        return knex
            .from('user_type')
            .select('*')
    },
    getById(knex, id) {
        return knex('user_type')
        .from('user_type')
        .where('user_type.id', id)
        .first()
    },
}

module.exports = UserTypeService;