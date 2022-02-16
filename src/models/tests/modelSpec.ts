import { Product, ProductStore } from '../product';
import { User, UserStore } from '../user';
import { Order, OrderProduct, OrderProductStore } from '../order';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

const pstore = new ProductStore();
const ustore = new UserStore();
const opstore = new OrderProductStore();

describe('store front suite', () => {
  const user: User = {
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'firstlast',
    userpassword: '',
  };

  const product: Product = {
    productname: 'product',
    price: 10,
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

  describe('User Model', () => {
    it('should have an index method', () => {
      expect(ustore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(ustore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(ustore.create).toBeDefined();
    });

    it('create method should add a user', async () => {
      const result = await ustore.create(user);

      expect(result.firstname).toEqual('firstname');
    });

    it('index method should return a list of users', async () => {
      const result = await ustore.index();

      expect(result[0].firstname).toEqual('firstname');
    });

    it('show method should return the correct user', async () => {
      const result = await ustore.show(1);

      expect(result.username).toEqual('firstlast');
    });
  });

  describe('Product Model', () => {
    it('should have an index method', () => {
      expect(pstore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(pstore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(pstore.create).toBeDefined();
    });

    it('should have a update method', () => {
      expect(pstore.update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(pstore.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
      const result = await pstore.create(product);
      expect(result.productname).toEqual('product');
    });
    // create another product to test delete method
    it('create method should add a product', async () => {
      const result = await pstore.create(product);
      expect(result.productname).toEqual('product');
    });

    it('index method should return a list of products', async () => {
      const result = await pstore.index();
      expect(result[0].category).toEqual('category');
    });

    it('show method should return the correct product', async () => {
      const result = await pstore.show(1);
      expect(result.price).toEqual(10);
    });

    it('delete method should remove the product', async () => {
      pstore.delete(2);
      const result = await pstore.index();

      expect(result[0].id).toEqual(1);
    });
  });

  describe('Order Model', () => {
    it('should have an index method', () => {
      expect(opstore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(opstore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(opstore.create).toBeDefined();
    });

    it('create method should add an order', async () => {
      const result = await opstore.create(order);
      expect(result.userid).toEqual(1);
    });

    it('index method should return a list of orders', async () => {
      const result = await opstore.index();
      expect(result[0].quantity).toEqual(10);
    });

    it('show method should return the correct order', async () => {
      const result = await opstore.show(1);
      expect(result.orderstatus).toEqual('completed');
    });
  });
});
