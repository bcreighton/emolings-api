const ReminderService = {
    getReminders(knex) {
        return knex
            .from('reminder')
            .select('*')
    },

    getById(knex, id) {
        return knex
            .from('reminder')
            .where('reminder.id', id)
            .first()
    }
}

module.exports = ReminderService;