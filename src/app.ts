import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { errorHandler, exitOnUnErr } from './middleware/errorHandler';
import { logError, logInfo, logUnErrors } from './middleware/logger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

class CustomError extends Error {
  code?: number;
}

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logInfo);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use('*', () => {
  const notFoundErr = new CustomError('URL not found');
  notFoundErr.code = 404;
  throw notFoundErr;
});

app.use(logError);

app.use(errorHandler);

process.on('unhandledRejection', (err: Error) => {
  logUnErrors('Unhandled Rejection:', err);
  exitOnUnErr();
});

// Promise.reject(Error('Oops! Unhandled Rejection'));

process.on('uncaughtException', err => {
  logUnErrors('Uncaught Exception:', err);
  exitOnUnErr();
});

// throw Error('Oops! Uncaught Exception');

export default app;
