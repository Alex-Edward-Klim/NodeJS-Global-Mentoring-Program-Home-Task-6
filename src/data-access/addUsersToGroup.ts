import dataBase from './dataBase';

import { Group, User } from '../models/index';

const addUsersToGroup = async (groupId: any, userIds: any) => {
  const t = await dataBase.transaction();

  try {
    const group: any = await Group.findOne({
      where: {
        id: groupId,
      },
    });

    const users: any = await User.findAll({
      where: {
        id: userIds,
      },
    });

    if (group && users.length > 0) {
      const UsersAddedToGroup = await group.addUsers(users);
      await t.commit();
      return UsersAddedToGroup;
    }
    throw new Error('Incorrect request data');
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export default addUsersToGroup;
