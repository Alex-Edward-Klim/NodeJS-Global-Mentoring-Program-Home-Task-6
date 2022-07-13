import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import morgan from 'morgan';

import usersRoutes from './routes/users';
import groupsRoutes from './routes/groups';

import addUsersToGroupRouter from './routes/addUsersToGroup';
import removeUsersFromGroupRouter from './routes/removeUsersFromGroup';

import logger from './logger';

const app = express();

app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (err) {
      return res.sendStatus(400);
    }

    return next();
  });
});

app.use(morgan(':response-time ms'));

app.use((req, res, next) => {
  const objectToLog = {
    method: req.method,
    params: req.query,
    body: req.body,
    url: req.originalUrl,
  };
  logger.info(objectToLog);
  next();
});

process.on('uncaughtException', (error) => {
  logger.error(`captured error: ${error.message}`);
  // const { exit } = process;
  // exit(1);
});

process.on('unhandledRejection', (reason) => {
  if (reason instanceof Error) {
    logger.error(`Unhandled rejection detected: ${reason.message}`);
    return;
  }
  logger.error(`Unhandled rejection detected: ${reason}`);
});

app.use('/api/users', usersRoutes);
app.use('/api/groups', groupsRoutes);

app.use('/api/addUsersToGroup', addUsersToGroupRouter);
app.use('/api/removeUsersFromGroup', removeUsersFromGroupRouter);

app.use((req, res) => {
  const err = {
    status: 404,
    message: 'URL not found',
  };

  res.status(404).json(err);
});

// eslint-disable-next-line
app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    if (res.headersSent) {
      return next(err);
    }
    logger.error(err.message);
    return res.status(err.status || 500).send(err.message);
  }
});

// throw new Error('custom err');

export default app;
