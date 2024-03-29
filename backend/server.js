import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/OrderRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/Alpha-Full-ecomerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });
  app.use('/api/users', userRouter);
  app.use('/api/orders', orderRouter);
app.get('/', (req, res) => {
  res.send('Server is ready');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
