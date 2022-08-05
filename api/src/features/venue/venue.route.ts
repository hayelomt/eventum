import { Router } from 'express';
import { imageUpload } from '../../core/middleware/file-upload';
import validate from '../../core/middleware/validate';
import { isAdmin } from '../admin/auth/_lib/admin-auth.middleware';
import VenueController from './venue.controller';
import VenueVal from './_lib/venue.val';

const venueRouter = Router();

venueRouter.post(
  '/',
  isAdmin,
  imageUpload.fields([{ name: 'heroImage', maxCount: 1 }, { name: 'images' }]),
  validate(VenueVal.createRules),
  VenueController.store,
);

venueRouter.put(
  '/:id',
  isAdmin,
  imageUpload.fields([{ name: 'heroImage', maxCount: 1 }, { name: 'images' }]),
  validate(VenueVal.updateRules),
  VenueController.update,
);

export default venueRouter;
