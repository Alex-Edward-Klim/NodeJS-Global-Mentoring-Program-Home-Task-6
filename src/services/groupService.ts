import Joi from 'joi';

import { GroupType } from '../types/group';
import {
  createGroupInDataBase,
  deleteGroupInDataBase,
  getAllGroupsFromDataBase,
  getGroupByIdFromDataBase,
  getGroupByNameFromDataBase,
  updateGroupInDataBase,
} from '../data-access/groups';

const getAllGroups = async () => {
  const groups = await getAllGroupsFromDataBase();
  return groups;
};

const getGroupById = async (id: string) => {
  const group = await getGroupByIdFromDataBase(id);
  return group;
};

const deleteGroup = async (id: string) => {
  const groupDeletedStatus = await deleteGroupInDataBase(id);
  return groupDeletedStatus;
};

const validateGroupByAllFields = (group: GroupType) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().required(),
    permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required()).required(),
  });

  const { error } = schema.validate(group, { abortEarly: false, allowUnknown: false });

  return error;
};

const validateGroupByOneField = (group: GroupType) => {
  const schema = Joi.object({
    name: Joi.string().alphanum(),
    permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
  }).min(1);

  const { error } = schema.validate(group, { abortEarly: false, allowUnknown: false });

  return error;
};

const checkIfNameAlreadyTaken = async (name: string) => {
  if (name === undefined) {
    return false;
  }

  const group = await getGroupByNameFromDataBase(name);
  if (group) {
    return true;
  }

  return false;
};

const checkIfGroupAlreadyExists = async (name: string) => {
  const group = await getGroupByNameFromDataBase(name);
  if (group) {
    return true;
  }
  return false;
};

const createNewGroup = async (group: GroupType) => {
  const newGroupData = await createGroupInDataBase(group);
  return newGroupData;
};

const updateGroup = async (id: string, updatedGroupDataObject: GroupType) => {
  const updatedUserData = await updateGroupInDataBase(id, updatedGroupDataObject);

  if (updatedUserData[0] === 1) {
    return updatedUserData[1][0];
  }
  return updatedUserData;
};

const groupService = {
  getAllGroups,
  getGroupById,
  createNewGroup,
  updateGroup,
  deleteGroup,
  checkIfNameAlreadyTaken,
  checkIfGroupAlreadyExists,
  validateGroupByAllFields,
  validateGroupByOneField,
};

export default groupService;
