import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource, initializeSampleData } from './database/dataSource';
import { configureContainer } from './container/bindings';
import apiRouter from './routes'
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const initializeApp = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    await initializeSampleData(AppDataSource);

    // Configure dependency injection container
    configureContainer();
    console.log('Dependency injection container configured');

    // Routes
    app.use('/api', apiRouter);

    // Health check
    app.get('/api/health', (req, res) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        database: AppDataSource.isInitialized ? 'connected' : 'disconnected'
      });
    });

    // ErrorHandler Middleware
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing application:', error);
    process.exit(1);
  }
};

initializeApp();
