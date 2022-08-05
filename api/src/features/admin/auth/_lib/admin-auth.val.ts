import { check, ValidationChain } from 'express-validator';
import validationBuilder from '../../../../core/utils/validation-builder';

type AdminAuthValKeys = 'loginRules';

const AdminAuthVal: Record<AdminAuthValKeys, ValidationChain[]> = {
  loginRules: [
    validationBuilder(check('email'), 'Email').required().string(),
    validationBuilder(check('password'), 'Password').required().string(),
  ].map((i) => i.build()),
};

export default AdminAuthVal;
