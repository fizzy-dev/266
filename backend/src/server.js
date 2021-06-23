import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/connectDB';
import initRoutes from './routes/api';

import following from './models/following.model'
import authRouter from './routes/auth'
import postRouter from './routes/post'
import followingRouter from './routes/following'

let app = express();
//connect to mongodb
connectDB();
// app.use(express.json())
// initRoutes(app);
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/following', followingRouter)
app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
})