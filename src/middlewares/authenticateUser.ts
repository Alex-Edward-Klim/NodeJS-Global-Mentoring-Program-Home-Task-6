import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  const token = bearerHeader?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err) => {
    if (err) {
      return res.sendStatus(403);
    }

    return next();
  });
};

export default authenticateUser;
