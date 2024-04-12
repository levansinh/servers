import { checkSchema } from 'express-validator';
import { validate } from '@/utils/validation';
import databaseService from '@/services/database.services';
import { hashPassword } from '@/utils/hashPassword';
import { verifyToken } from '@/utils/jwt';
import ErrorWithStatus from '@/models/Errors';
import HTTP_STATUS from '@/constants/httpStatus';

// export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({
//       flat: false,
//       msg: 'Missing input'
//     });

//   next();
// };

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: true,
        notEmpty: true,
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({
              email: value,
              password: hashPassword(req.body.password)
            });
            console.log(user);
            req.user = user;
          }
        }
      },
      password: {
        isLength: {
          options: {
            min: 6,
            max: 50
          }
        },
        isStrongPassword: {
          options: { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password failed');
            }
          }
        },
        isEmail: true,
        notEmpty: true,
        trim: true
      }
    },
    ['body']
  )
);

export const registerValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: true,
        notEmpty: true,
        trim: true
        // custom: {
        //   options: async (value, { req }) => {
        //     const isExistEmail = await databaseService.users.findOne({
        //       email: value
        //     });
        //     if (isExistEmail) {
        //       throw new Error('Email already exist');
        //     }
        //     return true;
        //   }
        // }
      },
      password: {
        isLength: {
          options: {
            min: 6,
            max: 50
          }
        },
        isStrongPassword: {
          options: { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
        },
        // custom: {
        //   options: (value, { req }) => {
        //     if (value !== req.body.password) {
        //       throw new Error('Password failed');
        //     }
        //   }
        // },
        isEmail: true,
        notEmpty: true,
        trim: true
      }
    },
    ['body']
  )
);

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authoriztion: {
        custom: {
          options: async (value, { req }) => {
            const accessToken = value.split('')[1];
            if (accessToken === '') {
              throw new ErrorWithStatus({
                flat: false,
                message: 'access token is required',
                status: HTTP_STATUS.AUTHORZATION_BAD
              });
            }
            const decode_authorization = await verifyToken(accessToken);
            req.user = decode_authorization;
            return true;
          }
        }
      }
    },
    ['headers']
  )
);

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        custom: {
          options: async (value, { req }) => {
            const accessToken = value.split('')[1];
            if (accessToken === '') {
              throw new ErrorWithStatus({
                flat: false,
                message: 'access token is required',
                status: HTTP_STATUS.AUTHORZATION_BAD
              });
            }
            const decode_authorization = await verifyToken(accessToken);
            req.user = decode_authorization;
            return true;
          }
        }
      }
    },
    ['headers']
  )
);
