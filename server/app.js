import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { config } from './config.js';
import { db } from './database/database.js';
import authRouter from './router/auth.js';
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

app.use('/auth', authRouter);
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

const socketIO = new Server(server, {
    cors: {
        origin: '*',
    },
});

socketIO.on('connection', (socket) => {
    console.log('Client is here!');
    socketIO.emit('review', 'Hello!');
});
