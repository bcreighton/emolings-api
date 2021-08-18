const { expect } = require("chai");
const {
  testUserType,
  testFeeling,
  testSeverity,
  testIdentifier,
  testReminder,
  testAdvFeeling,
  testCopingSkill,
  testFaq
} = require('./fixtures/app.fixtures');
const dbTransactions = require('./db_transactions');
const knex = require('knex');
const supertest = require("supertest");
const app = require("../src/app");

describe('UserType Endpoints', () => {
  let db;
  const auth = 'Authorization';
  const token = 'Bearer 5af56ab0-06bb-4109-ae1d-bb01b2e7f458';


  // Establish db connection

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db',db);
  });

  before(() => dbTransactions.cleanDB(db));
  afterEach(() => dbTransactions.cleanDB(db));
  after(() => db.destroy());

  describe('Given no user types', () => {
    context('GET /api/user-type', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/user-type')
          .set(auth, token)
          .expect(200, [])
      })
    })
    
    context(`GET /api/user-type/:id`, () => {
      it(`responds with 404`, () => {
        const user_type_id = 123456789;

        return supertest(app)
          .get(`/api/user-type/${user_type_id}`)
          .set(auth, token)
          .expect(404, {error: { message: `User Type does not exist`}})
      })
    })
  })

  describe(`Given there are user types in the database`, () => {
    // insert necessary data for user type table requirements
    beforeEach(() => {
      return dbTransactions.insertUserTypeData(db)
    });

    context(`GET /api/agent`, () => {
      it(`responds with 200 and all of the user type`, () => {
          return supertest(app)
            .get('/api/user-type')
            .set(auth, token)
            .expect(200, testUserType)
      });
    });

    context(`GET /api/user-type/:id`, () => {
      it(`responds with 200 and the specific user type`, () => {
        const userTypeId = 2;
        const expectedUserType = {
          id: 2,
          userType: 'child'
        };

        return supertest(app)
          .get(`/api/user-type/${userTypeId}`)
          .set(auth, token)
          .expect(200, expectedUserType)
      })
    })
  })
})

//==============================================

describe('Feeling Endpoints', () => {
  let db;
  const auth = 'Authorization';
  const token = 'Bearer 5af56ab0-06bb-4109-ae1d-bb01b2e7f458';


  // Establish db connection

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db',db);
  });

  before(() => dbTransactions.cleanDB(db));
  afterEach(() => dbTransactions.cleanDB(db));
  after(() => db.destroy());

  describe('Given no feelings', () => {
    context('GET /api/feeling', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/feeling')
          .set(auth, token)
          .expect(200, [])
      })
    })
    
    context(`GET /api/feeling/:id`, () => {
      it(`responds with 404`, () => {
        const feeling_id = 123456789;

        return supertest(app)
          .get(`/api/feeling/${feeling_id}`)
          .set(auth, token)
          .expect(404, {error: { message: `Feeling does not exist`}})
      })
    })
  })

  describe(`Given there are feelings in the database`, () => {
    // insert necessary data for user type table requirements
    beforeEach(() => {
      return dbTransactions.insertFeelingData(db)
    });

    context(`GET /api/feeling`, () => {
      it(`responds with 200 and all of the feelings`, () => {
          return supertest(app)
            .get('/api/feeling')
            .set(auth, token)
            .expect(200, testFeeling)
      });
    });

    context(`GET /api/feeling/:id`, () => {
      it(`responds with 200 and the specific feeling`, () => {
        const feelingId = 2;
        const expectedFeeling = testFeeling[feelingId-1];

        return supertest(app)
          .get(`/api/feeling/${feelingId}`)
          .set(auth, token)
          .expect(200, expectedFeeling)
      })
    })
  })
})

//===========================================================

describe('Advanced Feelings Endpoints', () => {
  let db;
  const auth = 'Authorization';
  const token = 'Bearer 5af56ab0-06bb-4109-ae1d-bb01b2e7f458';


  // Establish db connection

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db',db);
  });

  before(() => dbTransactions.cleanDB(db));
  afterEach(() => dbTransactions.cleanDB(db));
  after(() => db.destroy());

  describe('Given no advanced feelings', () => {
    context('GET /api/adv-feeling', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/adv-feeling')
          .set(auth, token)
          .expect(200, [])
      })
    })
    
    context(`GET /api/adv-feeling/:id`, () => {
      it(`responds with 404`, () => {
        const adv_feeling_id = 123456789;

        return supertest(app)
          .get(`/api/adv-feeling/${adv_feeling_id}`)
          .set(auth, token)
          .expect(404, {error: { message: `This advanced feeling does not exist`}})
      })
    })
  })

  describe(`Given there are advanced feelings in the database`, () => {
    // insert necessary data for user type table requirements
    beforeEach(() => {
      return dbTransactions.insertFeelingData(db)
        .then(() => dbTransactions.insertAdvFeelingData(db))
    });

    const updatedTestAdvFeeling = testAdvFeeling.map(advFeeling => {
      return {
        ...advFeeling,
        main_feeling: `feeling ${advFeeling.main_feeling}`
      }
    })

    context(`GET /api/adv-feeling`, () => {
      it(`responds with 200 and all of the advanced feelings`, () => {
          return supertest(app)
            .get('/api/adv-feeling')
            .set(auth, token)
            .expect(200, updatedTestAdvFeeling)
      });
    });

    context(`GET /api/adv-feeling/:id`, () => {
      it(`responds with 200 and the specific advanced feeling`, () => {
        const advFeelingId = 2;
        const expectedAdvFeeling = updatedTestAdvFeeling[advFeelingId-1]

        return supertest(app)
          .get(`/api/adv-feeling/${advFeelingId}`)
          .set(auth, token)
          .expect(200, expectedAdvFeeling)
      })
    })
  })
})

//===========================================================

describe('Coping Skill Endpoints', () => {
  let db;
  const auth = 'Authorization';
  const token = 'Bearer 5af56ab0-06bb-4109-ae1d-bb01b2e7f458';


  // Establish db connection

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db',db);
  });

  before(() => dbTransactions.cleanDB(db));
  afterEach(() => dbTransactions.cleanDB(db));
  after(() => db.destroy());

  describe('Given no coping skills', () => {
    context('GET /api/coping-skill', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/coping-skill')
          .set(auth, token)
          .expect(200, [])
      })
    })
    
    context(`GET /api/coping-skill/:id`, () => {
      it(`responds with 404`, () => {
        const coping_skill_id = 123456789;

        return supertest(app)
          .get(`/api/coping-skill/${coping_skill_id}`)
          .set(auth, token)
          .expect(404, {error: { message: `This coping skill does not exist`}})
      })
    })
  })

  describe(`Given there are coping skills in the database`, () => {
    // insert necessary data for user type table requirements
    beforeEach(() => {
      return dbTransactions.insertFeelingData(db)
        .then(() => dbTransactions.insertCopingSkillData(db))
    });

    const updatedTestCoping_skill = testCopingSkill.map(coping_skill => {
      return {
        id: coping_skill.id,
        child: coping_skill.child_skill,
        parent: coping_skill.parent_skill,
        main_feeling: `feeling ${coping_skill.main_feeling}`
      }
    })

    context(`GET /api/coping-skill`, () => {
      it(`responds with 200 and all of the coping skills`, () => {
          return supertest(app)
            .get('/api/coping-skill')
            .set(auth, token)
            .expect(200, updatedTestCoping_skill)
      });
    });

    context(`GET /api/coping-skill/:id`, () => {
      it(`responds with 200 and the specific coping skill`, () => {
        const coping_skill_Id = 2;
        const expectedCoping_skill = updatedTestCoping_skill[coping_skill_Id-1]

        return supertest(app)
          .get(`/api/coping-skill/${coping_skill_Id}`)
          .set(auth, token)
          .expect(200, expectedCoping_skill)
      })
    })
  })
})

//===========================================================

describe('faqs Endpoints', () => {
  let db;
  const auth = 'Authorization';
  const token = 'Bearer 5af56ab0-06bb-4109-ae1d-bb01b2e7f458';


  // Establish db connection

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db',db);
  });

  before(() => dbTransactions.cleanDB(db));
  afterEach(() => dbTransactions.cleanDB(db));
  after(() => db.destroy());

  describe('Given no faqs', () => {
    context('GET /api/faq', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/faq')
          .set(auth, token)
          .expect(200, [])
      })
    })
  })

  describe(`Given there are faqs in the database`, () => {
    // insert necessary data for user type table requirements
    beforeEach(() => {
      return dbTransactions.insertFaqData(db)
    });

    context(`GET /api/faq`, () => {
      it(`responds with 200 and all of the faqs`, () => {
          return supertest(app)
            .get('/api/faq')
            .set(auth, token)
            .expect(200, testFaq)
      });
    });
  })
})

//===========================================================

describe('Severity Endpoints', () => {
  let db;
  const auth = 'Authorization';
  const token = 'Bearer 5af56ab0-06bb-4109-ae1d-bb01b2e7f458';


  // Establish db connection

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db',db);
  });

  before(() => dbTransactions.cleanDB(db));
  afterEach(() => dbTransactions.cleanDB(db));
  after(() => db.destroy());

  describe('Given no severities', () => {
    context('GET /api/severity', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/severity')
          .set(auth, token)
          .expect(200, [])
      })
    })
    
    context(`GET /api/severity/:id`, () => {
      it(`responds with 404`, () => {
        const severity_id = 123456789;

        return supertest(app)
          .get(`/api/severity/${severity_id}`)
          .set(auth, token)
          .expect(404, {error: { message: `This severity does not exist`}})
      })
    })
  })

  describe(`Given there are severities in the database`, () => {
    // insert necessary data for user type table requirements
    beforeEach(() => {
      return dbTransactions.insertSeverityData(db)
    });

    const updatedTestAdvFeeling = testAdvFeeling.map(advFeeling => {
      return {
        ...advFeeling,
        main_feeling: `feeling ${advFeeling.main_feeling}`
      }
    })

    context(`GET /api/severity`, () => {
      it(`responds with 200 and all of the severities`, () => {
          return supertest(app)
            .get('/api/severity')
            .set(auth, token)
            .expect(200, testSeverity)
      });
    });

    context(`GET /api/severity/:id`, () => {
      it(`responds with 200 and the specific severity`, () => {
        const severityId = 2;
        const expectedSeverity = testSeverity[severityId-1]

        return supertest(app)
          .get(`/api/severity/${severityId}`)
          .set(auth, token)
          .expect(200, expectedSeverity)
      })
    })
  })
})

//===========================================================

describe('Identifiers Endpoints', () => {
  let db;
  const auth = 'Authorization';
  const token = 'Bearer 5af56ab0-06bb-4109-ae1d-bb01b2e7f458';


  // Establish db connection

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db',db);
  });

  before(() => dbTransactions.cleanDB(db));
  afterEach(() => dbTransactions.cleanDB(db));
  after(() => db.destroy());

  describe('Given no identities', () => {
    context('GET /api/identifier', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/identifier')
          .set(auth, token)
          .expect(200, [])
      })
    })
    
    context(`GET /api/identifier/:id`, () => {
      it(`responds with 404`, () => {
        const identifier_id = 123456789;

        return supertest(app)
          .get(`/api/identifier/${identifier_id}`)
          .set(auth, token)
          .expect(404, {error: { message: `Identifier does not exist`}})
      })
    })
  })

  describe(`Given there are identifiers in the database`, () => {
    // insert necessary data for user type table requirements
    beforeEach(() => {
      return dbTransactions.insertIdentifierData(db)
    });

    const updatedTestAdvFeeling = testAdvFeeling.map(advFeeling => {
      return {
        ...advFeeling,
        main_feeling: `feeling ${advFeeling.main_feeling}`
      }
    })

    context(`GET /api/identifier`, () => {
      it(`responds with 200 and all of the identifiers`, () => {
          return supertest(app)
            .get('/api/identifier')
            .set(auth, token)
            .expect(200, testIdentifier)
      });
    });

    context(`GET /api/identifier/:id`, () => {
      it(`responds with 200 and the specific identifier`, () => {
        const identifierId = 2;
        const expectedIdentifier = testIdentifier[identifierId-1]

        return supertest(app)
          .get(`/api/identifier/${identifierId}`)
          .set(auth, token)
          .expect(200, expectedIdentifier)
      })
    })
  })
})

//===========================================================

describe('Reminders Endpoints', () => {
  let db;
  const auth = 'Authorization';
  const token = 'Bearer 5af56ab0-06bb-4109-ae1d-bb01b2e7f458';


  // Establish db connection

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db',db);
  });

  before(() => dbTransactions.cleanDB(db));
  afterEach(() => dbTransactions.cleanDB(db));
  after(() => db.destroy());

  describe('Given no reminders', () => {
    context('GET /api/reminder', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/reminder')
          .set(auth, token)
          .expect(200, [])
      })
    })
    
    context(`GET /api/reminder/:id`, () => {
      it(`responds with 404`, () => {
        const reminder_id = 123456789;

        return supertest(app)
          .get(`/api/reminder/${reminder_id}`)
          .set(auth, token)
          .expect(404, {error: { message: `This reminder does not exist`}})
      })
    })
  })

  describe(`Given there are reminders in the database`, () => {
    // insert necessary data for user type table requirements
    beforeEach(() => {
      return dbTransactions.insertReminderData(db)
    });

    context(`GET /api/reminder`, () => {
      it(`responds with 200 and all of the reminders`, () => {
          return supertest(app)
            .get('/api/reminder')
            .set(auth, token)
            .expect(200, testReminder)
      });
    });

    context(`GET /api/reminder/:id`, () => {
      it(`responds with 200 and the specific reminder`, () => {
        const reminderId = 2;
        const expectedReminder = testReminder[reminderId-1]

        return supertest(app)
          .get(`/api/reminder/${reminderId}`)
          .set(auth, token)
          .expect(200, expectedReminder)
      })
    })
  })
})