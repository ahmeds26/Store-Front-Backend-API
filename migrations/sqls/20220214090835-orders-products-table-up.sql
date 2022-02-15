CREATE TABLE IF NOT EXISTS orders_products (id SERIAL PRIMARY KEY, 
    productID INTEGER REFERENCES products(id) NOT NULL, 
    userID INTEGER REFERENCES users(id) NOT NULL, 
    quantity INTEGER NOT NULL, 
    orderStatus VARCHAR(50) NOT NULL
);