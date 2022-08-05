import { Response } from 'express';
import catchAsync from '../../../core/utils/catch-async';
import AdminTokenService from '../admintoken/_lib/admin-token.service';
import { RequestWithAdmin } from './_lib/admin-auth.middleware';
import AdminAuthService from './_lib/admin-auth.service';

const AdminAuthController = {
  login: catchAsync(async (req, res) => {
    const admin = await AdminAuthService.login(req.body);

    const { refreshToken, accessToken } =
      await AdminTokenService.generateAuthTokens(admin.id!);

    res.json({
      data: {
        name: admin.profile.name,
        image: admin.profile.image,
        refreshToken,
        accessToken,
      },
    });
  }),

  refresh: catchAsync(async (req, res) => {
    const { refreshToken: refreshTokenRequest } = req.params;

    const adminId = await AdminTokenService.verifyRefreshToken(
      refreshTokenRequest,
    );

    const { accessToken, refreshToken } =
      await AdminTokenService.generateAuthTokens(adminId);

    res.json({
      data: {
        accessToken,
        refreshToken,
      },
    });
  }),

  test: catchAsync(async (req: RequestWithAdmin, res: Response) => {
    res.json({ a: req.admin.email });
  }),
};

export default AdminAuthController;
