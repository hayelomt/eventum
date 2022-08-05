import { Schema } from 'mongoose';
import { db } from '../../../core/db/connection';
import appConstants from '../../../core/utils/app-constants';

export interface IAdminToken extends Document {
  adminId: string;
  token: string;
  createdAt: string;
}

const adminTokenSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: appConstants.models.admin,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 24 * 3600,
  },
});

const AdminToken = db.model<IAdminToken>(
  appConstants.models.adminToken,
  adminTokenSchema,
);

export default AdminToken;
