import { Request, Response } from 'express';

import userService from '../services/userService';

const users_get_all = async (req: Request, res: Response) => {
  const { limit, loginSubstring } = req.query;

  const users = await userService.getAutoSuggestUsers(
    limit as string | undefined,
    loginSubstring as string | undefined,
  );

  if (!users) {
    res.status(500).send('DataBase Error');
  } else {
    res.json(users);
  }
};

const users_get_user = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (user) {
    res.send(user);
  } else {
    res.status(400).send('User not found');
  }
};

const users_create_user = async (req: Request, res: Response) => {
  const error = userService.validateUserByAllFields(req.body);

  if (error) {
    res.status(400).send(error.details);
  } else if (await userService.checkIfUserAlreadyExists(req.body.login)) {
    res.status(400).send('User already exists');
  } else {
    const newUser = await userService.createNewUser(req.body);
    if (newUser) {
      res.json(newUser);
    } else {
      res.status(500).send('DataBase Error');
    }
  }
};

const users_update_user = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (user) {
    const error = userService.validateUserByOneField(req.body);
    if (error) {
      res.status(400).send(error.details);
    } else if (await userService.checkIfLoginAlreadyTaken(req.body.login)) {
      res.status(400).send('Login is already taken');
    } else {
      const updatedUser = await userService.updateUser(id, req.body);
      res.send(updatedUser);
    }
  } else {
    res.status(400).send('User not found');
  }
};

const users_delete_user = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userDeletedStatus = await userService.deleteUser(id);

  if (userDeletedStatus === 1) {
    res.send('User Deleted');
  } else if (userDeletedStatus === 0) {
    res.status(400).send('User not found');
  } else {
    res.status(500).send('DataBase Error');
  }
};

const usersController = {
  users_get_all,
  users_get_user,
  users_create_user,
  users_update_user,
  users_delete_user,
};

export default usersController;
