import express from 'express'; 
const app = express();
import {PORT} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

// Body parsing middleware should come before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Security middleware
app.use(arcjetMiddleware);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// Error middleware should be last
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, async () => {
  console.log(`subscription tracker api is running on ${PORT}`);
  await connectToDatabase();
});

export default app;