CREATE TABLE adv_feeling (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    main_feeling INTEGER REFERENCES feeling(id) NOT NULL,
    color TEXT NOT NULL
);