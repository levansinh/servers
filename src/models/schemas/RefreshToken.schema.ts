import { ObjectId } from 'mongodb';

interface IRefreshToken {
  _id?: ObjectId;
  refreshToken: string;
  userId: ObjectId;
}
export class RefreshToken {
  _id?: ObjectId;
  refreshToken: string;
  userId: ObjectId;
  constructor({ _id, refreshToken, userId }: IRefreshToken) {
    this._id = _id;
    this.refreshToken = refreshToken;
    this.userId = userId;
  }
}
