# EMOLINGS
The modern age version of a feelings chart for Parents/Caregivers to create better conversations with children about the feelings and emotions they experience on a daily basis.

This is the backend for `EMOLINGS`.  A live version of the app can be found at [https://emolings-app.vercel.app/](https://emolings-app.vercel.app/)

The front end client can be found at [https://github.com/bcreighton/emolings-app](https://github.com/bcreighton/emolings-app).

## Introduction

Feeling charts are a thing of the past; unfortunately, they're limited as they're static and although their purpose and intent of feeling identification is decent it doesn't solve the root of the problem. CONVERSATION & COPING SKILLS!

EMOLINGS is a modern age version of a feelings chart!!

Not only does EMOLINGS provide emotion and feeling identification, both from the Parent/Caregiver and Child perspective; but EMOLINGS also provides the next steps which are the most essential.
* Create open communication between Parent/Guardian and Child
* Provide suggestions to help Parent/Guardian guide their Child to identify and express their emotions and feelings
* Present proven coping mechanisms to acknowledge and move through their emotions and feelings in a positive manner

## Quick App Demo

![Imgur](https://i.imgur.com/O8m5A8w.gif)

## Technology

#### Back End

* Node and Express
  * RESTful Api
* Testing
  * Supertest (integration)
  * Mocha and Chai (unit)
* Database
  * PostgreSQL
  * Knex.js - SQL wrapper

#### Production

* Deployed via Heroku

## Set up

Major dependencies for this repo include PostgreSQL and Node.

To get setup locally, do the following:

1. Clone this repository to your machine, `cd` into the directory and run `npm install`

2. Create the dev and test databases: `createdb -U postgres -d emolings` and `createdb -U postgres -d emolings-test`

3. Generate an API Token here: [https://www.uuidgenerator.net/version4](https://www.uuidgenerator.net/version4)

4. Create a `.env` file in the project root

Inside these files you'll need the following:

````
NODE_ENV=development
PORT=8000

DATABASE_URL="postgresql://postgres@localhost/emolings"
TEST_DATABASE_URL="postgresql://postgres@localhost/emolings-test"
API_TOKEN="INSERT GENERATED API TOKEN"
````

5. Run the migrations for dev - `npm run migrate`
6. Run the migrations for test - `NODE_ENV=test npm run migrate`
7. Seed the database for dev

* `psql -U <db-user> -d emolings -f ./seeds/seed.emolings.sql`

Now, run this same command again for the test database as well.

7. Run the tests - `npm t`
8. Start the app - `npm run dev`