# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index                   => '/products'     => GET method
- Show                    => '/products/:id' => GET method
- Create [token required] => '/products'     => POST method 
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
- Update                  => '/products/:id' => PUT method
- Delete                  => '/products/:id' => DELETE method

#### Users
- Index [token required]   => '/users'                => GET method
- Show [token required]    => '/users/:id'            => GET method
- Create N[token required] => '/users'                => POST method
- Authenticate             => '/users/authenticate'   => POST method

#### Orders
- Current Order by user (args: user id)[token required] => '/orders/:userId'         => GET method
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
- Index                                                    '/orders'                 => GET method
- Create                                                   '/orders'                 => POST method
- AddProduct                                               '/orders/:id/products'    => POST method

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
    TABLE "order_products" CONSTRAINT "order_products_productid_fkey" FOREIGN KEY (productid) REFERENCES products(id)
    TABLE "orders" CONSTRAINT "orders_productid_fkey" FOREIGN KEY (productid) REFERENCES products(id)


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
    TABLE "orders" CONSTRAINT "orders_userid_fkey" FOREIGN KEY (userid) REFERENCES users(id)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

	
                                      Table "public.orders"
   Column    |         Type          | Collation | Nullable |              Default
-------------+-----------------------+-----------+----------+------------------------------------
 id          | integer               |           | not null | nextval('orders_id_seq'::regclass)
 productid   | integer               |           | not null |
 userid      | integer               |           | not null |
 quantity    | integer               |           | not null |
 orderstatus | character varying(50) |           | not null |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_productid_fkey" FOREIGN KEY (productid) REFERENCES products(id)
    "orders_userid_fkey" FOREIGN KEY (userid) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_orderid_fkey" FOREIGN KEY (orderid) REFERENCES orders(id)
	
	
                              Table "public.order_products"
  Column   |  Type   | Collation | Nullable |                  Default
-----------+---------+-----------+----------+--------------------------------------------
 id        | integer |           | not null | nextval('order_products_id_seq'::regclass)
 orderid   | integer |           | not null |
 productid | integer |           | not null |
 quantity  | integer |           | not null |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_orderid_fkey" FOREIGN KEY (orderid) REFERENCES orders(id)
    "order_products_productid_fkey" FOREIGN KEY (productid) REFERENCES products(id)

