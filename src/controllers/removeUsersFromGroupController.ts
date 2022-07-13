import { Request, Response } from 'express';

import removeUsersFromGroupService from '../services/removeUsersFromGroupService';

const removeUsersFromGroup = async (req: Request, res: Response) => {
  const { groupId, userIds } = req.body;

  const UsersRemovedFromGroup = await removeUsersFromGroupService.removeUsersFromGroup(
    groupId,
    userIds,
  );

  if (!UsersRemovedFromGroup) {
    throw new Error('Incorrect request data');
  } else {
    res.status(200).send('Users Removeded From Group');
  }
};

const removeUsersFromGroupController = {
  removeUsersFromGroup,
};

export default removeUsersFromGroupController;
