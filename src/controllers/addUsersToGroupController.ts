import { Request, Response } from 'express';

import addUsersToGroupService from '../services/addUsersToGroupService';

const addUsersToGroup = async (req: Request, res: Response) => {
  const { groupId, userIds } = req.body;

  const UsersAddedToGroup = await addUsersToGroupService.addUsersToGroup(groupId, userIds);

  if (!UsersAddedToGroup) {
    throw new Error('Incorrect request data');
  } else {
    res.status(200).send('Users Added To Group');
  }
};

const addUsersToGroupController = {
  addUsersToGroup,
};

export default addUsersToGroupController;
