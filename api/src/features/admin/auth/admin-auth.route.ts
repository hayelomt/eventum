import { Router } from 'express';
import validate from '../../../core/middleware/validate';
import AdminAuthController from './admin-auth.controller';
import { isAdmin } from './_lib/admin-auth.middleware';
import AdminAuthVal from './_lib/admin-auth.val';

const adminAuthRouter = Router();

adminAuthRouter.post(
  '/login',
  validate(AdminAuthVal.loginRules),
  AdminAuthController.login,
);

adminAuthRouter.get('/test', isAdmin, AdminAuthController.test);

export default adminAuthRouter;
