import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { Document, Schema } from 'mongoose';
import { db } from '../../core/db/connection';
import appConstants from '../../core/utils/app-constants';
import authConfig from '../auth/lib/auth-config';

export interface IAdmin extends Document {
  email: string;
  password: string;

  profile: {
    name: string;
    image: string;
  };

  comparePassword: (password: string) => Promise<boolean>;
}

const ProfileSchema = new Schema({
  name: String,
  image: String,
});

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    transform: (val: string) => val.toLowerCase(),
  },
  password: {
    type: String,
    required: true,
  },
  profile: ProfileSchema,
});

AdminSchema.pre('save', async function (next: NextFunction): Promise<void> {
  const admin: IAdmin = this;

  if (!admin.isModified('password')) {
    next();
  }

  try {
    const salt: string = await bcrypt.genSalt(authConfig.saltRounds);
    const hash: string = await bcrypt.hash(admin.password, salt);

    admin.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

AdminSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  try {
    return bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    return err;
  }
};

const Admin = db.model<IAdmin>(appConstants.models.admin, AdminSchema);

export default Admin;
