export interface GenerateMsgI {
    message: string;
    status: number;
}
export declare const generateMessages: (code: string, validator?: boolean, type?: string) => GenerateMsgI;
