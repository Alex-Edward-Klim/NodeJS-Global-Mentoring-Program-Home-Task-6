import addUsersToGroupInDataBase from '../data-access/addUsersToGroup';

const addUsersToGroup = async (groupId: string, userIds: string[]) => {
  const UsersAddedToGroup = await addUsersToGroupInDataBase(groupId, userIds);
  return UsersAddedToGroup;
};

const addUsersToGroupService = {
  addUsersToGroup,
};

export default addUsersToGroupService;
