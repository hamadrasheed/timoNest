import * as jwt from 'jsonwebtoken';
import { generateMessages } from './generateMessage';

export const authenticateToken = (authorizationToken: string): number => {

    try {

        if(!authorizationToken) {
          throw generateMessages('TOKEN_NOT_FOUND');
        }

        const tokenParse: string[] = authorizationToken?.split(' ');

        if (!tokenParse || !tokenParse[1]) {
          throw generateMessages('UNAUTHORIZED');
        }
  
        const token: string = tokenParse[1];
       
        let decodedToken: string | jwt.JwtPayload;

        try {
          decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (error) {
          if (error?.message == 'jwt expired') {
            throw generateMessages('TOKEN_BLACKLISTED');
          }
          throw generateMessages('UNAUTHORIZED_TOKEN');
        }
  

        if (typeof decodedToken === 'string') {
            throw generateMessages('TOKEN_INVALID');
        }
        
        const currentDate: number = new Date().getTime()/1000;

        if (currentDate > decodedToken.exp) {
          throw generateMessages('TOKEN_BLACKLISTED');
        }

        return decodedToken.id;

    } catch (error) {
      throw error;
    }
}