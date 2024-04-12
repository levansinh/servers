import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import databaseService from '@/services/database.services';
import userRouter from './routes/user.routes';
import categoryRouter from './routes/category.routes';

const app = express();
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
);

app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product', categoryRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Have Error', err.message);
  res.status(404).json({ error: err.message });
});

databaseService.connect();

app.listen(process.env.PORT, () => {
  console.log(`server running port ${process.env.PORT}`);
});
