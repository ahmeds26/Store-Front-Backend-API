CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, 
    productName VARCHAR(150) NOT NULL, 
    price INTEGER NOT NULL, 
    category VARCHAR(100)
);
