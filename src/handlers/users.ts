import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middlewares/authorize';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.params.id));
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    userpassword: req.body.userpassword,
  };
  try {
    const tokenSecret = process.env.TOKEN_SECRET as Secret;
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json((err as string) + user);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    userpassword: req.body.userpassword,
  };

  try {
    const newUser = await store.authenticateUser(
      user.username,
      user.userpassword
    );
    res.json(newUser);
  } catch (err) {
    res.status(401);
    res.json((err as string) + user);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
};

export default userRoutes;
