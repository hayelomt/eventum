import Findable from '../../../core/contracts/findable';
import UserService from '../../user/lib/user.service';
import UserTokenService from '../../user/usertoken/lib/user-token.service';
import Tokenable from '../contracts/tokenable';
import { UserTypes } from './auth-type';

type AuthProviderType = {
  tokenable: Record<UserTypes, Tokenable>;
  authService: Record<UserTypes, Findable>;
};

const AuthProvider: AuthProviderType = {
  tokenable: {
    user: UserTokenService,
  },
  authService: {
    user: UserService,
  },
};

export default AuthProvider;
