import express from 'express';

import groupsController from '../controllers/groupsController';

const router = express.Router();

router.get('/', groupsController.groups_get_all);
router.get('/:id', groupsController.groups_get_group);
router.post('/', groupsController.groups_create_group);
router.patch('/:id', groupsController.groups_update_group);
router.delete('/:id', groupsController.groups_delete_group);

export default router;
