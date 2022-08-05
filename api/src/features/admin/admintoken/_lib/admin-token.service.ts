import * as jwt from 'jsonwebtoken';
import HttpError from '../../../../core/error';
import adminAuthConfig from '../../_lib/admin-auth-config';
import AdminToken from '../admin-token';

const AdminTokenService = {
  generateAuthTokens: async (adminId: string) => {
    const payload = { _id: adminId };
    const accessToken = jwt.sign(payload, adminAuthConfig.jwtSecret, {
      expiresIn: adminAuthConfig.jwtExpiresIn,
    });
    const refreshToken = jwt.sign(payload, adminAuthConfig.refreshSecret, {
      expiresIn: adminAuthConfig.refreshExpiresIn,
    });

    const adminToken = await AdminToken.findOne({ adminId: payload._id });

    if (adminToken) {
      await adminToken.remove();
    }

    await AdminToken.create({ adminId: payload._id, token: refreshToken });

    return { accessToken, refreshToken };
  },

  verifyRefreshToken: async (refreshToken: string) => {
    const adminToken = await AdminToken.findOne({ token: refreshToken });
    if (!adminToken) {
      throw new HttpError(401, 'Invalid refresh token');
    }

    try {
      const valid = (await jwt.verify(
        refreshToken,
        adminAuthConfig.refreshSecret,
      )) as { _id: string };

      return valid._id;
    } catch (err) {
      throw new HttpError(401, 'Invalid refresh token');
    }
  },
};

export default AdminTokenService;
