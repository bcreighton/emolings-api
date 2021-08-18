module.exports = {
    testUserType: [
        {
            id: 1,
            user_type: 'parent-caregiver'
        },
        {
            id: 2,
            user_type: 'child'
        },
    ],

    testFeeling: [
        {
            id: 1,
            name: 'feeling 1',
            color: 'blue',
        },
        {
            id: 2,
            name: 'feeling 2',
            color: 'red',
        }
    ],

    testSeverity: [
        {
            id: 1,
            level: 'Low',
            color: 'blue',
        },
        {
            id: 2,
            level: 'High',
            color: 'red',
        },
    ],

    testIdentifier: [
        {
            id: 1,
            identifier: 'Identifier 1',
            type: 'Feeling',
        },
        {
            id: 2,
            identifier: 'Identifier 2',
            type: 'Severity',
        },
    ],

    testReminder: [
        {
            id: 1,
            reminder: 'Reminder 1',
        },
        {
            id: 2,
            reminder: 'Reminder 2',
        },
    ],

    testAdvFeeling: [
        {
            id: 1,
            name: 'Adv Feeling 1',
            main_feeling: 1,
            color: 'green',
        },
        {
            id: 2,
            name: 'Adv Feeling 2',
            main_feeling: 2,
            color: 'red',
        },
    ],

    testCopingSkill: [
        {
            id: 1,
            child_skill: 'Child Skill 1',
            parent_skill: 'Parent Skill 1',
            main_feeling: 1,
        },
        {
            id: 2,
            child_skill: 'Child Skill 2',
            parent_skill: 'Parent Skill 2',
            main_feeling: 2,
        },
    ],

    testFaq: [
        {
            id: 1,
            question: '? 1',
            answer: 'A 1',
        },
        {
            id: 2,
            question: '? 2',
            answer: 'A 2',
        },
    ]
}