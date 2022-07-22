import express from 'express';

import addUsersToGroupController from '../controllers/addUsersToGroupController';

const router = express.Router();

router.post('/', addUsersToGroupController.addUsersToGroup);

export default router;
