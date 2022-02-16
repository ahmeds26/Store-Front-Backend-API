import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middlewares/authorize';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  } 
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
  
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      productname: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const product: Product = {
    id: parseInt(req.params.id),
    productname: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  const updatedProduct = await store.update(product);
  res.json(updatedProduct);
};

const destroy = async (req: Request, res: Response) => {
  const deletedProduct = await store.delete(parseInt(req.params.id));
  res.json(deletedProduct);
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productRoutes;
