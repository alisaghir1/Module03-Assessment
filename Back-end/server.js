// installed node packages express and boyd parser and mysql
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import exampleRouter from './routes/articleRoute.js';
import userRouter from './routes/userRoute.js'

const app = express();


app.use(cors());

//This middleware is responsible for parsing the JSON data in the request body and making it available in req.body.
app.use(express.json());

app.use('/uploads', express.static('uploads'));

// app usages
app.use('/articles', exampleRouter);
app.use('/users', userRouter);


//app connection
app.listen(5000, () => {
  console.log('app is running and listening on port 5000');
});
