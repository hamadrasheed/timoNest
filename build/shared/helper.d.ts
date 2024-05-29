export declare class Helper {
    protected deleteAttributes: <K, T>(keys: K[], obj: T) => T;
    protected filterNonEmpty: <T>(arr: T[]) => T[];
    protected filterNonNull: <T>(arr: T[]) => T[];
    protected filterUnique: <T>(data: T[]) => T[];
    protected groupByType: <T, Y>(data: T[], field: string) => Y[];
    protected paginate: <T, Y>(array: T[], page_size: number, page_number: number) => T[];
    protected shallowCopy: <T>(data: T) => T;
    protected sort: <T, Y>(items: T[], attribute: Y) => T[];
    protected generateFourDigitRandomNumber: () => number;
    protected formatFourDigitRandomNumber: (number: number) => string;
    protected validateDateIsOld: (date: Date, number: number) => boolean;
}
