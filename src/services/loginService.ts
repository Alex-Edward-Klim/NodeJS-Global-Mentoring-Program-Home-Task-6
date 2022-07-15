import jwt from 'jsonwebtoken';

import { getUserByLoginFromDataBase } from '../data-access/users';

// const login = async (username: string, password: string) => {
const getUserByLogin = async (username: string) => {
  // if (login === undefined) {
  //   return false;
  // }

  const user = await getUserByLoginFromDataBase(username);
  return user;

  // console.log('user: ', user);

  // if (user) {
  //   return true;
  // }

  // return false;
};

const authorizeUser = (user: any) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string);
  return accessToken;
};

const loginService = {
  authorizeUser,
  getUserByLogin,
  // login,
};

export default loginService;
