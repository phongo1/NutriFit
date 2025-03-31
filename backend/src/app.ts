import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import groceryRoutes from './routes/grocery';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/grocery', groceryRoutes);

export default app;