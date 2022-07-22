import { Request, Response } from 'express';

import loginService from '../services/loginService';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user: any = await loginService.getUserByLogin(username);

  if (!user) {
    return res.status(400).send('Invalid credentials');
  }

  if (user.password === password) {
    const userObject = {
      username,
      password,
    };
    const accessToken = loginService.authorizeUser(userObject);
    return res.json({ accessToken });
  }

  return res.status(400).send('Invalid credentials');
};

const loginController = {
  login,
};

export default loginController;
