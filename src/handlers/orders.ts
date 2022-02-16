import express, { Request, Response } from 'express';
import { Order, OrderProduct, OrderProductStore } from '../models/order';
import verifyAuthToken from '../middlewares/authorize';

const order_store = new OrderProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await order_store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await order_store.show(parseInt(req.params.userId));
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      productid: req.body.productid,
      userid: req.body.userid,
      quantity: req.body.quantity,
      orderstatus: req.body.orderstatus,
    };

    const newOrder = await order_store.create(order);

    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const add_product = async (req: Request, res: Response) => {
  try {
    const order_product: OrderProduct = {
      orderid: parseInt(req.params.id),
      productid: req.body.productid,
      quantity: req.body.quantity,
    };

    const newOrderProduct = await order_store.addProduct(order_product);

    res.json(newOrderProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderProductRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:userId', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.post('/orders/:id/products', verifyAuthToken, add_product);
};

export default orderProductRoutes;
