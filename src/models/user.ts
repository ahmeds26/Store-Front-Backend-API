import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  userpassword: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * from users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't find any users ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't find any user with ${id}. Error: ${(err as Error).message}`
      );
    }
  }

  async authenticateUser(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT userPassword FROM users WHERE userName='${username}'`;
      const saltRounds = SALT_ROUNDS as string;
      const pepper = BCRYPT_PASSWORD as string;

      const result = await conn.query(sql);

      conn.release();

      if (result.rows.length) {
        const userHash = result.rows[0];
        if (bcrypt.compareSync(password + pepper, userHash.userpassword)) {
          return userHash;
        }
      }

      return null;
    } catch (err) {
      throw new Error(
        `Couldn't authenticate user with username : ${username}.Error: ${
          (err as Error).message
        }`
      );
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, userName, userPassword) VALUES($1, $2, $3, $4) RETURNING *';
      const saltRounds = SALT_ROUNDS as string;
      const pepper = BCRYPT_PASSWORD as string;
      const passwordHash = bcrypt.hashSync(
        user.userpassword + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.username,
        passwordHash,
      ]);
      const newUser = result.rows[0];
      conn.release();
      //console.log(newUser);
      //console.log(newUser.username);
      return newUser;
    } catch (err) {
      throw new Error(
        `Couldn't create new user with username : ${user.username}.Error: ${
          (err as Error).message
        }`
      );
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const numberOfDeletedRows = result.rowCount;
      const deletedUser = result.rows[0];
      conn.release();
      return deletedUser;
    } catch (err) {
      throw new Error(`Couldn't delete user with ${id}. Error: ${err}`);
    }
  }
}
