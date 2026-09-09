import { notFoundHandler, errorHandler } from './middlewares/error-handlers.js';

import express from 'express';
import api from './api/index.js';

const app = express();

app.use('/public', express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', api);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
