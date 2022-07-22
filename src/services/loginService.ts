import jwt from 'jsonwebtoken';

import { getUserByLoginFromDataBase } from '../data-access/users';

const getUserByLogin = async (username: string) => {
  const user = await getUserByLoginFromDataBase(username);
  return user;
};

const authorizeUser = (user: any) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string);
  return accessToken;
};

const loginService = {
  authorizeUser,
  getUserByLogin,
};

export default loginService;
