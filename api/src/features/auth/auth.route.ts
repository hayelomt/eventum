import { Router } from 'express';
import validate from '../../core/middleware/validate';
import AuthController from './auth.controller';
import { isAuthenticated } from './_lib/auth.middleware';
import AuthVal from './_lib/auth.val';

const authRouter = Router();

authRouter.post(
  '/user/sign-up',
  validate(AuthVal.signUpUserRules),
  AuthController.signUpUser,
);

authRouter.post(
  '/user/login',
  validate(AuthVal.loginRules),
  AuthController.loginUser,
);

authRouter.post('/user/refresh/:refreshToken', AuthController.refresh('user'));

authRouter.get('/test', isAuthenticated('user'), AuthController.test);

export default authRouter;
