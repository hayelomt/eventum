import { Router } from 'express';
import validate from '../../../core/middleware/validate';
import AdminAuthController from './admin-auth.controller';
import AdminAuthVal from './_lib/admin-auth.val';

const adminAuthRouter = Router();

adminAuthRouter.post(
  '/login',
  validate(AdminAuthVal.loginRules),
  AdminAuthController.login,
);

export default adminAuthRouter;
