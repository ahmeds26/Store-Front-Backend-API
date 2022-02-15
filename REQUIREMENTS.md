# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index                   => '/products'
- Show                    => '/products/:id'
- Create [token required] => '/products'
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]   => '/users'
- Show [token required]    => '/users/:id'
- Create N[token required] => '/users'

#### Orders
- Current Order by user (args: user id)[token required] => '/orders/:userId'
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

                                      Table "public.products"
   Column    |          Type          | Collation | Nullable |               Default
-------------+------------------------+-----------+----------+--------------------------------------
 id          | integer                |           | not null | nextval('products_id_seq'::regclass)
 productname | character varying(150) |           | not null |
 price       | integer                |           | not null |
 category    | character varying(100) |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders_products" CONSTRAINT "orders_products_productid_fkey" FOREIGN KEY (productid) REFERENCES products(id)


#### User
- id
- firstName
- lastName
- password

                                       Table "public.users"
    Column    |          Type          | Collation | Nullable |              Default
--------------+------------------------+-----------+----------+-----------------------------------
 id           | integer                |           | not null | nextval('users_id_seq'::regclass)
 firstname    | character varying(100) |           | not null |
 lastname     | character varying(100) |           | not null |
 username     | character varying(150) |           | not null |
 userpassword | character varying(250) |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders_products" CONSTRAINT "orders_products_userid_fkey" FOREIGN KEY (userid) REFERENCES users(id)
    TABLE "orders" CONSTRAINT "orders_userid_fkey" FOREIGN KEY (userid) REFERENCES users(id)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

	
                                      Table "public.orders_products"
   Column    |         Type          | Collation | Nullable |                   Default
-------------+-----------------------+-----------+----------+---------------------------------------------
 id          | integer               |           | not null | nextval('orders_products_id_seq'::regclass)
 productid   | integer               |           | not null |
 userid      | integer               |           | not null |
 quantity    | integer               |           | not null |
 orderstatus | character varying(50) |           | not null |
Indexes:
    "orders_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_products_productid_fkey" FOREIGN KEY (productid) REFERENCES products(id)
    "orders_products_userid_fkey" FOREIGN KEY (userid) REFERENCES users(id)

