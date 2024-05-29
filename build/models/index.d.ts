import { users } from './user.model';
import { roles } from './role.model';
import { userOtpInfo } from './userOtpInfo.model';
export * from './user.model';
export * from './role.model';
export * from './userOtpInfo.model';
export declare const models: (typeof users | typeof roles | typeof userOtpInfo)[];
