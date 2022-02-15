/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, 
    firstName VARCHAR(100) NOT NULL, 
    lastName VARCHAR(100) NOT NULL, 
    userName VARCHAR(150) NOT NULL, 
    userPassword VARCHAR(250) NOT NULL
);
