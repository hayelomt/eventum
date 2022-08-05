type LoginDto = {
  email: string;
  password: string;
};

const AdminAuthDto = {
  login: (data: any): LoginDto => ({
    email: data.email,
    password: data.password,
  }),
};

export default AdminAuthDto;
