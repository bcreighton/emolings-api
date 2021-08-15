-- TRUNCATE all tables to ensure there is not data prior to seeding
TRUNCATE coping_skill, adv_feeling, reminder, identifier, severity, feeling, user_type RESTART IDENTITY CASCADE;

--insert all data into tables
-- insert user_type

INSERT INTO user_type
    (user_type)
    VALUES
        ('parent-caregiver'),
        ('child');

--insert feelings

INSERT INTO feeling
    (name, color)
    VALUES
        ('Tired', 'green'),
        ('Happy', 'yellow'),
        ('Sad', 'blue'),
        ('Mad', 'red'),
        ('Scared', 'orange'),
        ('Confused', 'purple');

-- insert severity

INSERT INTO severity
    (level)
    VALUES
        ('Low'),
        ('Medium'),
        ('High');

-- insert identifier

INSERT INTO identifier
    (identifier, type)
    VALUES
        ('Where do you feel it in your body? E.g. hands, chest, mouth, feet', 'Feeling'),
        ('How are you feeling right now?', 'Feeling'),
        ('What was the most challenging part of your day?', 'Feeling'),
        ('What was the best part of your day?', 'Feeling'),
        ('Do you want to talk about, draw it or write it down?', 'Feeling'),
        ('Are you feeling safe or unsafe?', 'Feeling');

--insert reminder

INSERT INTO reminder
    (reminder)
    VALUES
        ('Know when you need a breakt from the situation.'),
        ('Try setting a timer to try again.'),
        ('You too may need to practice a coping skill to be in a good space to assist them in coping.'),
        ('Space may be the solution, but remind them they are not alone.'),
        ('You cannot talk through a tantrum.'),
        ('There is a message in every meltdown; do not forget to revisit the situation');

-- insert advanced feelings

INSERT INTO adv_feeling
    (name, main_feeling, color)
    VALUES
        ('Exhausted', 1, 'light-green'),
        ('Sleepy', 1, 'green'),
        ('Drained', 1, 'dark-green'),
        ('Loved', 2, 'light-yellow'),
        ('Silly', 2, 'yellow'),
        ('Confident', 2, 'dark-yellow'),
        ('Lonely', 3, 'light-blue'),
        ('Hurt', 3, 'blue'),
        ('Overwhelmed', 3, 'dark-blue'),
        ('Annoyed', 4, 'light-red'),
        ('Frustrated', 4, 'red'),
        ('Angry', 4, 'dark-red'),
        ('Embarrassed', 5, 'light-orange'),
        ('Nervous', 5, 'orange'),
        ('Worried', 5, 'dark-orange'),
        ('Irritated', 6, 'light-purple'),
        ('Distracted', 6, 'purple'),
        ('Scattered', 6, 'dark-purple');

--insert coping skills

INSERT INTO coping_skill
    (child_skill, parent_skill, main_feeling)
    VALUES
        ('Take a nap', 'Suggest taking a nap', 1),
        ('Go outside to get fresh air', 'Take them outside for some fresh air', 1),
        ('Eat a healthy snack', 'Offer a healthy snack', 1),
        ('Share joy with other (tell a joke)', 'Suggest telling a joke', 2),
        ('Exercise or dance', 'Suggest exercise or dancing', 2),
        ('Sing your favorite song', 'Suggest singing their favorite song', 2),
        ('Do something you enjoy (art, music)', 'Suggest something they truly enjoy', 3),
        ('Cry', 'Give some space for them to cry', 3),
        ('Talk to someone you trust', 'Ask if they want to talk to you or someone esle they trust', 3),
        ('Use a fidget (squeeze a ball)', 'Give them a fidget, e.g., ball or chew toy', 4),
        ('Take a break', 'Suggest taking a positive break (not a timeout)', 4),
        ('Take a deep breath', 'Take some deep breaths with them', 4),
        ('Tell someone how you feel', 'Ask them why they feel this way', 5),
        ('Hug or snuggle with your favorite toy, doll or stuffy', 'Provide an item of comfort, e.g., toy, doll or stuffy', 5),
        ('Do an activity with an adult or friend', 'Ask if they want to do an activity with you or a friend', 5),
        ('Ask for an explaination or an example', 'Give clarification or an example', 6),
        ('Slow down and try again', 'Suggest calming their body and trying again', 6),
        ('Practice deep breathing', 'Suggest taking some time to relax', 6);