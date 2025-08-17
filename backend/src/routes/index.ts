import { Router } from "express";
import bookingRoutes from './bookings';
import roomRoutes from './rooms';

const router = Router();

router.use('/bookings', bookingRoutes)
router.use('/rooms', roomRoutes)

export default router
