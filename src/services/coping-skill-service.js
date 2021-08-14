const CopingSkillService = {
    getCopingSkills(knex) {
        return knex
            .from('coping_skill')
            .join('feeling', 'feeling.id', 'coping_skill.main_feeling')
            .select(
                'coping_skill.id AS id',
                'coping_skill.child_skill AS child',
                'coping_skill.parent_skill AS parent',
                'feeling.name AS main_feeling'
            )
    },

    getById(knex, id) {
        return knex
            .from('coping_skill')
            .leftOuterJoin('feeling', 'feeling.id', 'coping_skill.main_feeling')
            .where('coping_skill.id', id)
            .first()
            .select(
                'coping_skill.id AS id',
                'coping_skill.child_skill AS child',
                'coping_skill.parent_skill AS parent',
                'feeling.name AS main_feeling'
            )
    },

    getByMainFeeling(knex, main_feeling) {
        return knex
            .from('coping_skill')
            .leftOuterJoin('feeling', 'feeling.id', 'coping_skill.main_feeling')
            .where('coping_skill.main_feeling', main_feeling)
            .select(
                'coping_skill.id AS id',
                'coping_skill.child_skill AS child',
                'coping_skill.parent_skill AS parent',
                'feeling.name AS main_feeling'
            )
    }
}

module.exports = CopingSkillService;