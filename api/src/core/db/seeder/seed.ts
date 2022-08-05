import Admin, { IAdmin } from '../../../features/admin/admin';
import AdminToken from '../../../features/admin/admintoken/admin-token';
import User from '../../../features/user/user';
import UserToken from '../../../features/user/usertoken/user-token';

type FakeDataProps = {
  admin: Partial<IAdmin>;
};

const fakeData: FakeDataProps = {
  admin: {
    email: 'admin@eventer.com',
    password: 'secret',
    profile: {
      name: 'Ainz',
      image: 'uploads/imgs/admin-avatar.png',
    },
  },
};

const clearDb = async () => {
  await AdminToken.deleteMany();
  await Admin.deleteMany();
  await UserToken.deleteMany();
  await User.deleteMany();
};

const seed = async () => {
  console.log('Start seeding 🚀');

  console.log('Clearing database...');
  await clearDb();

  console.log('Inserting data...');
  await Admin.create(fakeData.admin);

  console.log('Finished seeding 🧊');
  process.exit(0);
};

seed();
