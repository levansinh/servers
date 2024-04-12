import { TokenType } from '@/constants/enum';
import { LoginRequestParams } from '@/models/requests/User.request';
import { RefreshToken } from '@/models/schemas/RefreshToken.schema';
import User from '@/models/schemas/User.schema';
import databaseService from '@/services/database.services';
import { hashPassword } from '@/utils/hashPassword';
import { signToken } from '@/utils/jwt';
import { ObjectId } from 'mongodb';

class UserService {
  private async signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    });
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    });
  }
  async register(payload: LoginRequestParams) {
    const response = await databaseService.users.insertOne(
      new User({
        ...payload,
        password: await hashPassword(payload.password)
      })
    );
    const userId = response.insertedId.toString();
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(userId),
      this.signRefreshToken(userId)
    ]);
    return { access_token, refresh_token };
  }

  async login(payload: { _id: string }) {
    const { _id } = payload;
    const [access_token, refresh_token] = await Promise.all([this.signAccessToken(_id), this.signRefreshToken(_id)]);
    databaseService.refreshToken.insertOne(
      new RefreshToken({ userId: new ObjectId(_id), refreshToken: refresh_token })
    );
    return { access_token, refresh_token };
  }

  async getUser(payload: { email: string }) {
    const { email } = payload;
    return databaseService.users.findOne({ email });
  }
}
const userService = new UserService();

export default userService;
