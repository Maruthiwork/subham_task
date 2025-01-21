import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import { createTerminus } from '@godaddy/terminus';
import { handler } from './build/handler.js';
import morgan from 'morgan'; // Import morgan

const app = express();

app.use(morgan('combined')); // 'combined' format provides detailed logging

app.use(handler);

const server = http.createServer(app);

createTerminus(server, {
  signals: ['SIGTERM', 'SIGINT'],
  onSignal: async () => {
    // Call your cleanup functions below. For example:
    // db.shutdown();
  }
});

server.listen(8080, () => {
  console.log('Listening on port 8080');
});
