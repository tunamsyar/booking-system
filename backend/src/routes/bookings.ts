import { Router } from 'express';
import { container } from '../container/Container';
import { TYPES } from '../container/types';
import { IBookingController } from '../controllers/BookingController';

const router = Router();

router.post('/', async (req, res, next) => {
  const bookingController = container.get<IBookingController>(TYPES.BookingController);
  await bookingController.createBooking(req, res, next);
});

router.get('/', async (req, res, next) => {
  const bookingController = container.get<IBookingController>(TYPES.BookingController);
  await bookingController.getUserBookings(req, res, next);
});

export default router;
