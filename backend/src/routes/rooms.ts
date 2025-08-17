import { Router } from 'express';
import { container } from '../container/Container';
import { TYPES } from '../container/types';
import { IRoomController } from '../controllers/RoomController';

const router = Router();

router.get('/', async (req, res, next) => {
  const roomController = container.get<IRoomController>(TYPES.RoomController);
  await roomController.getAllRooms(req, res, next);
});

export default router;
