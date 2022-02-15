import express, { Request, Response } from 'express';
import { OrderProduct, OrderProductStore } from '../models/order';
import verifyAuthToken from '../middlewares/authorize';

const order_product_store = new OrderProductStore();

const index = async (_req: Request, res: Response) => {
  const orders = await order_product_store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await order_product_store.show(parseInt(req.params.userId));
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const orderProduct: OrderProduct = {
      productid: req.body.productid,
      userid: req.body.userid,
      quantity: req.body.quantity,
      orderstatus: req.body.orderstatus,
    };

    const newOrderProduct = await order_product_store.create(orderProduct);

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
};

export default orderProductRoutes;
