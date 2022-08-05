import catchAsync from '../../../core/utils/catch-async';
import AdminTokenService from '../admintoken/_lib/admin-token.service';
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
};

export default AdminAuthController;
