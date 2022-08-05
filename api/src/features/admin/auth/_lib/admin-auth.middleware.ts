import * as jwt from 'jsonwebtoken';
import * as http from 'http';
import { NextFunction, Request, Response } from 'express';
import { IAdmin } from '../../admin';
import adminAuthConfig from './admin-auth-config';
import AdminService from '../../_lib/admin.service';
import HttpError from '../../../../core/error';

const { TokenExpiredError } = jwt;

export interface RequestWithAdmin extends Request {
  admin: IAdmin;
}

export const isAdmin = async (
  req: RequestWithAdmin,
  res: Response,
  next: NextFunction,
) => {
  const token: string | string[] = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token.toString(), adminAuthConfig.jwtSecret) as {
      _id: string;
    };
    const admin = await AdminService.findOne(payload._id);

    if (!admin) {
      return res.status(401).json({ msg: 'Account not found' });
    }

    req.admin = admin;

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ msg: 'Token expired, login again ' });
    }

    return next(new HttpError(401, http.STATUS_CODES[401]));
  }
};
