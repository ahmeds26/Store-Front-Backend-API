import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Routes Suite', () => {
  describe('User Routes', () => {
    it('gets the main api endpoint', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
    it('gets the users create api endpoint', async () => {
      const response = await request.post('/users');
      expect(response.status).toBe(401);
      expect(response.text.includes('Access denied, invalid token'));
    });
    it('gets the users index api endpoint', async () => {
      const response = await request.get('/users');
      expect(response.status).toBe(401);
      expect(response.text.includes('Access denied, invalid token'));
    });
    it('gets the user show api endpoint', async () => {
      const response = await request.get('/users/:id');
      expect(response.status).toBe(401);
      expect(response.text.includes('Access denied, invalid token'));
    });
    it('gets the user authenticate api endpoint', async () => {
      const response = await request.post('/users/authenticate');
      expect(response.status).toBe(200);
      expect(response.text.includes('Access denied, invalid token'));
    });
  });

  describe('Product Routes', () => {
    it('gets the main api endpoint', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
    it('gets the products create api endpoint', async () => {
      const response = await request.post('/products');
      expect(response.status).toBe(401);
      expect(response.text.includes('Access denied, invalid token'));
    });
    it('gets the products index api endpoint', async () => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    });
    it('gets the products show api endpoint', async () => {
      const response = await request.get('/products/1');
      expect(response.status).toBe(200);
    });
    it('gets the products delete api endpoint', async () => {
      const response = await request.delete('/products/:id');
      expect(response.status).toBe(401);
      expect(response.text.includes('Access denied, invalid token'));
    });
    it('gets the products update api endpoint', async () => {
      const response = await request.put('/products/:id');
      expect(response.status).toBe(401);
      expect(response.text.includes('Access denied, invalid token'));
    });
  });

  describe('Order Routes', () => {
    it('gets the main api endpoint', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
    it('gets the orders create api endpoint', async () => {
      const response = await request.post('/orders');
      expect(response.status).toBe(401);
      expect(response.text.includes('Access denied, invalid token'));
    });
    it('gets the orders index api endpoint', async () => {
      const response = await request.get('/orders');
      expect(response.status).toBe(401);
      expect(response.text.includes('Access denied, invalid token'));
    });
    it('gets the orders show api endpoint', async () => {
      const response = await request.get('/orders/1');
      expect(response.status).toBe(401);
      expect(response.text.includes('Access denied, invalid token'));
    });
  });
});
