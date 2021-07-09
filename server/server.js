import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import recipeRoutes from './routes/recipeRoutes.js';
import chefRoutes from './routes/chefRoutes.js';
import chefPublicRoutes from './routes/chefPublicRoutes.js';
import cookbookRoutes from './routes/cookbookRoutes.js';
//import uploadRoutes from './routes/uploadRoutes.js';
import uploadAWSRoutes from './routes/uploadAWSRoutes.js';
import uploadChefPictureRoutes from './routes/uploadChefPictureRoutes.js';
import emailGroceryRoutes from './routes/emailGroceryRoutes.js';
import textGroceryListRoutes from './routes/textGroceryListRoutes.js';

dotenv.config();

connectDB()

const app = express();

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json());

app.use('/api/recipes', recipeRoutes)
app.use('/api/chef', chefRoutes)
app.use('/api/chefs', chefPublicRoutes)
app.use('/api/cookbooks', cookbookRoutes)
app.use('/api/uploadAWS', uploadAWSRoutes)
app.use('/api/uploadChefPicture', uploadChefPictureRoutes)
app.use('/api/email', emailGroceryRoutes)
app.use('/api/text', textGroceryListRoutes)
//app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()

// Save images locally - delete later
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))
  app.get("/*", (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

app.use(cors());
