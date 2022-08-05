import HttpError from '../../../../core/error';
import Admin from '../../admin';
import AdminAuthDto from './admin-auth.dto';

const AdminAuthService = {
  login: async (data: any) => {
    const { email, password } = AdminAuthDto.login(data);

    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new HttpError(400, 'Authorization error', {
        email: 'Invalid Credential',
      });
    }

    const valid = await admin.comparePassword(password);
    if (!valid) {
      throw new HttpError(400, 'Authorization error', {
        email: 'Invalid Credential',
      });
    }

    return admin;
  },
};

export default AdminAuthService;
