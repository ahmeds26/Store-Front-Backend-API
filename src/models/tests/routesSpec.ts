import supertest from 'supertest';
import app from '../../server';
import { Product, ProductStore } from '../product';
import { User, UserStore } from '../user';
import { Order, OrderProduct, OrderProductStore } from '../order';

const request = supertest(app);

describe('Routes Suite', () => {

  const user: User = {
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'firstlast',
    userpassword: 'password',
  };

  const product_payload = {
    name: 'product',
    price: 10,
    category: 'category',
  };

  const to_update_product_payload = {
    name: 'product',
    price: 50,
    category: 'category',
  };

  const order: Order = {
    productid: 1,
    userid: 1,
    quantity: 10,
    orderstatus: 'completed',
  };

  const orderproduct: OrderProduct = {
    orderid: 1,
    productid: 1,
    quantity: 10,
  };

  let token: string;

  beforeAll(async () => { 
    const response = await request.post('/users').send(user);
    token = response.body;
  });

  it('gets the main api endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  describe('User Routes', () => {
    /*
    it('gets the users create api endpoint', async () => {
      const response = await request.post('/users').send(user);
      expect(response.status).toBe(200);
    });
    */
    it('gets the users index api endpoint', async () => {
      const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    
    it('gets the user show api endpoint', async () => {
      const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    it('gets the user authenticate api endpoint', async () => {
      const response = await request.post('/users/authenticate').send(user);
      expect(response.status).toBe(200);
    });
  });
  
  describe('Product Routes', () => {

    it('gets the products create api endpoint', async () => {
      const response = await request.post('/products').set('Authorization', `Bearer ${token}`).send(product_payload);
      expect(response.status).toBe(200);
    });
    it('gets the products create api endpoint', async () => {
      const response = await request.post('/products').set('Authorization', `Bearer ${token}`).send(product_payload);
      expect(response.status).toBe(200);
    });
    it('gets the products index api endpoint', async () => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    });
    it('gets the products show api endpoint', async () => {
      const response = await request.get('/products/1');
      expect(response.status).toBe(200);
    });
    it('gets the products update api endpoint', async () => {
      const response = await request.put('/products/1').set('Authorization', `Bearer ${token}`).send(to_update_product_payload);
      expect(response.status).toBe(200);
    });
    it('gets the products delete api endpoint', async () => {
      const response = await request.delete('/products/2').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
  
  describe('Order Routes', () => {
    
    it('gets the orders create api endpoint', async () => {
      const response = await request.post('/orders').set('Authorization', `Bearer ${token}`).send(order);
      expect(response.status).toBe(200);
    });
    it('gets the orders index api endpoint', async () => {
      const response = await request.get('/orders').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    it('gets the orders show api endpoint', async () => {
      const response = await request.get('/orders/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    it('gets the addProduct to order_products api endpoint', async () => {
      const response = await request.post('/orders/1/products').set('Authorization', `Bearer ${token}`).send(orderproduct);
      expect(response.status).toBe(200);
    });
  });
});
