import express from 'express';

import removeUsersFromGroupController from '../controllers/removeUsersFromGroupController';

const router = express.Router();

router.post('/', removeUsersFromGroupController.removeUsersFromGroup);

export default router;
