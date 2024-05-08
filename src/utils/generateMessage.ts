import * as dotenv from 'dotenv';

import { responses } from '../errorCodes/codes';

dotenv.config({ path: '.env' });

interface GenerateMsgI {
    [key: string]: number | string;
}

/**
 *
 * @param code
 * @param validator
 * @param type
 */
export const generateMessages: (code: string, validator?: boolean, type?: string) => GenerateMsgI = (code: string, validator: boolean, type: string): GenerateMsgI => {

    const codes = JSON.parse(JSON.stringify(responses));

    return codes[`${code}`];

};
