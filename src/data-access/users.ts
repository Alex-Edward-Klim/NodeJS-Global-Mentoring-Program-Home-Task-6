import { Op } from 'sequelize';

import { UserType } from '../types/user';
import { Group, User } from '../models/index';

export const getAllUsersFromDataBase = async (
  limit: number | undefined,
  loginSubstring: string | undefined,
) => {
  const users = await User.findAll({
    where: loginSubstring
      ? {
        login: {
          [Op.substring]: loginSubstring,
        },
      }
      : undefined,
    limit,
    order: loginSubstring || limit ? [['login', 'ASC']] : undefined,
    include: [Group],
  });
  return users;
};

export const getUserByIdFromDataBase = async (id: string) => {
  const user = await User.findOne({
    where: {
      id,
    },
    include: [Group],
  });
  return user;
};

export const getUserByLoginFromDataBase = async (login: string) => {
  const user = await User.findOne({
    where: {
      login,
    },
    include: [Group],
  });
  return user;
};

export const createUserInDataBase = async (newUserObject: UserType) => {
  const newUser = await User.create(newUserObject);
  return newUser;
};

export const updateUserInDataBase = async (id: string, updatedUserDataObject: UserType) => {
  const user = await User.update(updatedUserDataObject, {
    where: {
      id,
    },
    returning: true,
  });
  return user;
};

export const deleteUserInDataBase = async (id: string) => {
  const userDeletedStatus = await User.destroy({
    where: {
      id,
    },
  });
  return userDeletedStatus;
};
