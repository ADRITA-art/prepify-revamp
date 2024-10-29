import express from 'express';
import bodyParser from 'body-parser';
import articleRoutes from "./routes/articleRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import connectDB from './config/database.mjs';
import dotenv from 'dotenv';
import cors from 'cors';
import events from 'events';
dotenv.config();

const app = express();
connectDB();
events.EventEmitter.defaultMaxListeners = 15;

app.use(bodyParser.json());
app.use (express.json());
app.use (
                        cors(
                                                {
                                                                        origin:"*",
                                                }
                        )
)
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);



app.get('/', (req, res) => {
 res.send('Hello World');
 });

 app.listen(5000, () => {
  console.log('Server is running. ');
  });