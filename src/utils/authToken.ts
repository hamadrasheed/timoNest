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
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const currentDate: number = new Date().getTime()/1000;

        if (currentDate > decodedToken.exp) {
          throw generateMessages('TOKEN_BLACKLISTED');
        }

        return decodedToken.id;

    } catch (error) {
        throw error;
    }
}