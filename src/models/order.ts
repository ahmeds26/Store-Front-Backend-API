import client from '../database';

export type OrderProduct = {
  id?: number;
  productid: number;
  userid: number;
  quantity: number;
  orderstatus: string;
};

export class OrderProductStore {
  async index(): Promise<OrderProduct[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * from orders_products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't find any orders ${err}`);
    }
  }

  async show(userId: number): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders_products WHERE userId=($1)';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't find any order from user id ${userId}. Error: ${
          (err as Error).message
        }`
      );
    }
  }

  async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders_products (productId, userId, quantity, orderStatus) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        orderProduct.productid,
        orderProduct.userid,
        orderProduct.quantity,
        orderProduct.orderstatus,
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
