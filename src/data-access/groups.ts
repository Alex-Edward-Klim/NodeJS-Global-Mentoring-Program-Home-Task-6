import { Group, User } from '../models/index';
import { GroupType } from '../types/group';

export const getAllGroupsFromDataBase = async () => {
  const groups = await Group.findAll({
    include: [User],
  });
  return groups;
};

export const getGroupByIdFromDataBase = async (id: string) => {
  const group = await Group.findOne({
    where: {
      id,
    },
    include: [User],
  });
  return group;
};

export const getGroupByNameFromDataBase = async (name: string) => {
  const group = await Group.findOne({
    where: {
      name,
    },
    include: [User],
  });
  return group;
};

export const createGroupInDataBase = async (newGroupObject: GroupType) => {
  const newGroup = await Group.create(newGroupObject);
  return newGroup;
};

export const updateGroupInDataBase = async (id: string, updatedGroupDataObject: GroupType) => {
  const group = await Group.update(updatedGroupDataObject, {
    where: {
      id,
    },
    returning: true,
  });
  return group;
};

export const deleteGroupInDataBase = async (id: string) => {
  const groupDeletedStatus = await Group.destroy({
    where: {
      id,
    },
  });
  return groupDeletedStatus;
};
