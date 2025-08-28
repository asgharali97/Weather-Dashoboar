import express from 'express';
import cors from 'cors';
import rateLimit from "express-rate-limit";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());


const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 20,
  message: "Too many requests. Try again tomorrow.",
});

// Routes 
import weatherRoutes from './routes/weather.route.js';
import metricRoutes from './routes/metric.routes.js';

app.use("/api/", limiter);
app.use('/api', weatherRoutes)
app.use('/api/metrics', metricRoutes)

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


export default app;