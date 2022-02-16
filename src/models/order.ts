import client from '../database';

export type OrderProduct = {
  id?: number;
  orderid: number;
  productid: number;
  quantity: number;
};

export type Order = {
  id?: number;
  productid: number;
  userid: number;
  quantity: number;
  orderstatus: string;
};

export class OrderProductStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * from orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't find any orders ${err}`);
    }
  }

  async show(userid: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE userId=($1)';
      const result = await conn.query(sql, [userid]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't find any order from user id ${userid}. Error: ${
          (err as Error).message
        }`
      );
    }
  }

  async addProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (orderid, productid, quantity) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        orderProduct.orderid,
        orderProduct.productid,
        orderProduct.quantity,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't create new order_product. Error: ${(err as Error).message}`
      );
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (productId, userId, quantity, orderStatus) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        order.productid,
        order.userid,
        order.quantity,
        order.orderstatus,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't create new order. Error: ${(err as Error).message}`
      );
    }
  }
}
