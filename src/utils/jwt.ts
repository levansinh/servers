import jwt from 'jsonwebtoken';

export const signToken = async ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object;
  privateKey?: string;
  options?: jwt.SignOptions;
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error);
      }
      resolve(token as string);
    });
  });
};

export const verifyToken = async ({
  token,
  privateKey = process.env.JWT_SECRET as string
}: {
  token: string;
  privateKey?: string;
}) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decode) => {
      if (error) {
        throw reject(error);
      }
      resolve(decode as jwt.JwtPayload);
    });
  });
};
