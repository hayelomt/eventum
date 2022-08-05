import env from '../../../../core/env';

const adminAuthConfig = {
  saltRounds: 12,
  jwtSecret: env.adminAuth.JWT_SECRET,
  jwtExpiresIn: env.adminAuth.JWT_EXPIRE_MINUTES * 60, // seconds
  refreshSecret: env.adminAuth.REFRESH_SECRET,
  refreshExpiresIn: env.adminAuth.REFRESH_EXPIRE_DAYS * 24 * 3600,
  issuer: 'eventer.com',
  audience: 'eventer.com',
};

export default adminAuthConfig;
