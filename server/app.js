import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { config } from './config.js';
import { db } from './database/database.js';
import userRouter from './router/user.js';
import orderRouter from './router/order.js';
import refundRouter from './router/refund.js';
import deliveryRouter from './router/delivery.js';
import reviewRouter from './router/review.js';

const app = express();

app.use(express.json());
app.use(express.raw());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/refund', refundRouter);
app.use('/delivery', deliveryRouter);
app.use('/review', reviewRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(500);
});

db.getConnection();

const server = app.listen(config.host.port, () => {
    console.log('server is on ...');
});
