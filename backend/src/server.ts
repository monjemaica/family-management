import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './routes/routes';
import mongoose from 'mongoose';
import { config } from './config/db'
dotenv.config()

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.mongodb.url);

    if (connection) {
      app.listen(config.server.port, () => {
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        console.log(`Server started on port http://localhost:${config.server.port}`);
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};

connectDB();

app.use('/familymngt/', router());