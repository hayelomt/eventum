import Admin from '../admin';

const AdminService = {
  findOne: (id: string) => {
    return Admin.findById(id).select('-password');
  },
};

export default AdminService;
