const {testUserType,
    testFeeling,
    testSeverity,
    testIdentifier,
    testReminder,
    testAdvFeeling,
    testCopingSkill,
    testFaq} = require('./fixtures/app.fixtures');

const dbTransactions = {
    cleanDB(db) {
        return db('coping_skill').truncate()
        .then(() => db('faq').truncate())
        .then(() => db('adv_feeling').truncate())
        .then(() => db('reminder').truncate())
        .then(() => db('identifier').truncate())
        .then(() => db('severity').truncate())
        .then(() => db('user_type').truncate())
        // Remove all foreign key constraints to allow for removal of all data in the db tables
            // Knex provides issues with the naming convention of foreign keys.
            // psql creation uses 'fkey', Knex creation uses 'foreign'
            // This creates an issue when the database has to be rebuilt
            // Can be avoided by useing Knex migration and db creation.
            // Standard SQL will recreate this issue
        .then(() => db.raw('ALTER TABLE adv_feeling DROP CONSTRAINT adv_feeling_main_feeling_foreign'))
        .then(() => db.raw('ALTER TABLE coping_skill DROP CONSTRAINT coping_skill_main_feeling_foreign'))
        .then(() => db('feeling').truncate())
            // Re-establish foreign key relationships that were removed above.
        .then(() => {
            return db.schema.table('adv_feeling', table => {
                table.foreign('main_feeling')
                    .references('feeling.id');
            })
        })
        .then(() => {
            return db.schema.table('coping_skill', table => {
                table.foreign('main_feeling')
                    .references('feeling.id');
            })
        })
    },

    insertUserTypeData(db) {
        return db.into('user_type')
            .insert(testUserType)
    },

    insertFeelingData(db) {
        return db.into('feeling')
                .insert(testFeeling)
    },

    insertSeverityData(db) {
        return db.into('severity')
            .insert(testSeverity)
    },

    insertIdentifierData(db) {
        return db.into('identifier')
            .insert(testIdentifier)
    },

    insertReminderData(db) {
        return db.into('reminder')
            .insert(testReminder)
    },

    insertAdvFeelingData(db) {
        return db.into('adv_feeling')
            .insert(testAdvFeeling)
    },

    insertCopingSkillData(db) {
        return db.into('coping_skill')
            .insert(testCopingSkill)
    },

    insertFaqData(db) {
        return db.into('faq')
            .insert(testFaq)
    },
}

module.exports = dbTransactions;