import { ObjectId } from 'mongodb';

export interface UserType {
  _id?: ObjectId;
  email: string;
  password: string;
  mobile?: number;
  fullName?: string;
  role?: string;
  refreshToken?: string;
  create_at?: Date;
  update_at?: Date;
}
export default class User {
  _id: ObjectId;
  email: string;
  password: string;
  mobile: number;
  fullName: string;
  role: string;
  refreshToken: string;
  create_at: Date;
  update_at: Date;
  constructor(user: UserType) {
    const date = new Date();
    this._id = user._id || new ObjectId();
    this.fullName = user.fullName || '';
    this.email = user.email;
    this.password = user.password;
    this.mobile = user.mobile || 0;
    this.role = user.role || '';
    this.refreshToken = user.refreshToken || '';
    this.create_at = user.create_at || date;
    this.update_at = user.update_at || date;
  }
}
