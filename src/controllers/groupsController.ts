import { Request, Response } from 'express';

import groupService from '../services/groupService';

const groups_get_all = async (req: Request, res: Response) => {
  const groups = await groupService.getAllGroups();

  if (!groups) {
    res.status(500).send('DataBase Error');
  } else {
    res.json(groups);
  }
};

const groups_get_group = async (req: Request, res: Response) => {
  const { id } = req.params;

  const group = await groupService.getGroupById(id);

  if (group) {
    res.send(group);
  } else {
    res.status(400).send('Group not found');
  }
};

const groups_create_group = async (req: Request, res: Response) => {
  const error = groupService.validateGroupByAllFields(req.body);

  if (error) {
    res.status(400).send(error.details);
  } else if (await groupService.checkIfGroupAlreadyExists(req.body.name)) {
    res.status(400).send('Group already exists');
  } else {
    const newGroup = await groupService.createNewGroup(req.body);
    if (newGroup) {
      res.json(newGroup);
    } else {
      res.status(500).send('DataBase Error');
    }
  }
};

const groups_update_group = async (req: Request, res: Response) => {
  const { id } = req.params;

  const group = await groupService.getGroupById(id);

  if (group) {
    const error = groupService.validateGroupByOneField(req.body);
    if (error) {
      res.status(400).send(error.details);
    } else if (await groupService.checkIfNameAlreadyTaken(req.body.name)) {
      res.status(400).send('Name is already taken');
    } else {
      const updatedGroup = await groupService.updateGroup(id, req.body);
      res.send(updatedGroup);
    }
  } else {
    res.status(400).send('Group not found');
  }
};

const groups_delete_group = async (req: Request, res: Response) => {
  const { id } = req.params;

  const groupDeletedStatus = await groupService.deleteGroup(id);

  if (groupDeletedStatus === 1) {
    res.send('Group Deleted');
  } else if (groupDeletedStatus === 0) {
    res.status(400).send('Group not found');
  } else {
    res.status(500).send('DataBase Error');
  }
};

const groupsController = {
  groups_get_all,
  groups_get_group,
  groups_create_group,
  groups_update_group,
  groups_delete_group,
};

export default groupsController;
