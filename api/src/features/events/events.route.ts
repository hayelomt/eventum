import { Router } from 'express';
import validate from '../../core/middleware/validate';
import { isAdmin } from '../admin/auth/_lib/admin-auth.middleware';
import EventsController from './events.controller';
import EventsVal from './_lib/events.val';

const eventsRouter = Router();

eventsRouter.post(
  '/',
  isAdmin,
  validate(EventsVal.createRules),
  EventsController.store,
);

export default eventsRouter;
