import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/mongodb.js';
import connectCLOUDINARY from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express();
// const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());


// API endpoints

app.get('/', (req, res) => {
  res.send('API is running');
});


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
  

const startServer = async () => {
    try {
      await connectDB();
      connectCLOUDINARY();
  
      // app.listen(4000,() => {
      //   console.log(`Server running on port`);
      // });
    } catch (error) {
      console.error('Error starting the server', error);
    }
  };
  
  startServer();

  export default app;
  