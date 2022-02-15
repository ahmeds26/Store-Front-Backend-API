import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderProductRoutes from './handlers/orders';

const app: express.Application = express();
const address: string = '127.0.0.1:3000';

const corsOptions = {
  origin: '',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

productRoutes(app);
userRoutes(app);
orderProductRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
