import removeUsersFromGroupInDataBase from '../data-access/removeUsersFromGroup';

const removeUsersFromGroup = async (groupId: string, userIds: string[]) => {
  const UsersRemovedFromGroup = await removeUsersFromGroupInDataBase(groupId, userIds);
  return UsersRemovedFromGroup;
};

const removeUsersFromGroupService = {
  removeUsersFromGroup,
};

export default removeUsersFromGroupService;
