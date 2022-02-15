import client from '../database';

export type Product = {
  id?: number;
  productname: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * from products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't find any products ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't find any product with ${id}. Error: ${(err as Error).message}`
      );
    }
  }
  /*
    async create(p: Product): Promise<Product>{
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const resultedProduct = result.rows[0];
            conn.release()
            return resultedProduct;
        } catch (err) {
            throw new Error(`Couldn't create new product with name : ${name}.Error: ${(err as Error).message}`);
        }
    };
    */
  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (productName, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        product.productname,
        product.price,
        product.category,
      ]);
      const resultedProduct = result.rows[0];
      conn.release();
      return resultedProduct;
    } catch (err) {
      throw new Error(
        `Couldn't create new product with name : ${
          product.productname
        }.Error: ${(err as Error).message}`
      );
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const numberOfDeletedRows = result.rowCount;
      const deletedProduct = result.rows[0];
      conn.release();
      return deletedProduct;
    } catch (err) {
      throw new Error(`Couldn't delete product with ${id}. Error: ${err}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      let sql, result, updatedProduct;
      const conn = await client.connect();
      if (product.productname && product.price) {
        sql =
          'Update products SET productName=($2),price=($3) WHERE id=($1) RETURNING *';
        result = await conn.query(sql, [
          product.id,
          product.productname,
          product.price,
        ]);
        updatedProduct = result.rows[0];
      } else if (product.productname && product.category) {
        sql =
          'Update products SET productName=($2),category=($3) WHERE id=($1) RETURNING *';
        result = await conn.query(sql, [
          product.id,
          product.productname,
          product.category,
        ]);
        updatedProduct = result.rows[0];
      } else if (product.price && product.category) {
        sql =
          'Update products SET price=($2),category=($3) WHERE id=($1) RETURNING *';
        result = await conn.query(sql, [
          product.id,
          product.price,
          product.category,
        ]);
        updatedProduct = result.rows[0];
      } else if (product.productname) {
        sql = 'Update products SET productName=($2) WHERE id=($1) RETURNING *';
        result = await conn.query(sql, [product.id, product.productname]);
        updatedProduct = result.rows[0];
      } else if (product.price) {
        sql = 'Update products SET price=($2) WHERE id=($1) RETURNING *';
        result = await conn.query(sql, [product.id, product.price]);
        updatedProduct = result.rows[0];
      } else {
        sql = 'Update products SET category=($2) WHERE id=($1) RETURNING *';
        result = await conn.query(sql, [product.id, product.category]);
        updatedProduct = result.rows[0];
      }
      conn.release();
      return updatedProduct;
    } catch (err) {
      throw new Error(
        `Couldn't update product with ${product.id}. Error: ${
          (err as Error).message
        }`
      );
    }
  }
}
