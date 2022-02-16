     Store Front Backend API

This project is a simple backend api for a store using the following:

    1- Node.js
    2- Typescript
    3- Postgres
    4- Express
    5- Jasmine

Usage:

    Preparing .env file:
        you should have a .env file in the root directory of the project and replace the following parameters inside it according to your environment:

        POSTGRES_HOST=<database-host>
        POSTGRES_DB=<dev-database-name>
        POSTGRES_TEST_DB=<test-database-name>
        POSTGRES_USER=<postgres-user>
        POSTGRES_PASSWORD=<postgres-password>
        ENV=dev
        BCRYPT_PASSWORD=<your-bcrypt-password>
        SALT_ROUNDS=10
        TOKEN_SECRET=<your-token-secret-password> 

    Installing Dependencies: 
        Run: yarn or npm i 

    Preparing Data:
        You should create two databases on Postgres:
			database-host: for example "127.0.0.1"
			database-port: for example "5432" 
            dev-database: for example "store_database"
            test-database: for example "store_database_test"
        
        Running the migration script to create the tables as defined in REQUIREMENTS.md:
            Run: npm run migrate

    Experimenting Using Postman tool:

        you should have Postman installed and start the server file locally:

        Run: npm run start

        Users Endpoints:

            create: http://localhost:3000/users'
            index: http://localhost:3000/users'
            show: http://localhost:3000/users/:id'
            authenticate: http://localhost:3000/users/authenticate'

        Products Endpoints:

            create: http://localhost:3000/products'
            index: http://localhost:3000/products'
            show: http://localhost:3000/products/:id'
            delete: http://localhost:3000/products/:id'
            update: http://localhost:3000/products/:id'

        Orders Endpoints:

            create: http://localhost:3000/orders'
            index: http://localhost:3000/orders'
            show: http://localhost:3000/orders/:userid'
			addProduct: http://localhost:3000/orders/:id/products'

    Testing Using Jasmine:

        Run: npm run test

