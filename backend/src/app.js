import express from 'express';
import cors from 'cors';
import { apiLimiter } from './middleware/rateLimiter.Middleware.js';
import { metrics } from './utils/metrics.js';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.use((req, res,next) => {
  metrics.totalRequests++;
  next();
});

// Rate limiter on all routes
app.use("/api/", apiLimiter);

// Routes 
import weatherRoutes from './routes/weather.route.js';
import metricRoutes from './routes/metric.routes.js';

app.use('/api', weatherRoutes);
app.use('/api/metrics', metricRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

export default app;