export class Helper  {

    protected deleteAttributes = <K, T>(keys: K[], obj: T): T => {

        if (!obj || !Object.keys(obj).length) {
            return null;
        }

        if (keys.length) {
            for (const key of keys) {
                delete obj[String(key)];
            }
            return obj;
        }

        delete obj[String(keys)];
    }

    protected filterNonEmpty = <T>(arr: T[]): T[] => arr.filter((value: T): boolean => JSON.stringify(value) !== '[]');

    protected filterNonNull = <T>(arr: T[]): T[] => arr.filter((e: T): boolean => e !== null && e !== undefined);

    protected filterUnique = <T>(data: T[]): T[] => data.filter((v: T, i: number, a: T[]): boolean => a.indexOf(v) === i);

    protected groupByType = <T, Y>(data: T[], field: string): Y[] => data.reduce((acc: Y[], c: T): any => {
            const type: string = c[`${field}`];
            acc[type] ? acc[type].push(c) : (acc[type] = [c]);
            return acc;
        },                                                                       {})

    protected paginate = <T, Y>(array: T[], page_size: number, page_number: number): T[] => array.slice((page_number - 1) * page_size, page_number * page_size);

    protected shallowCopy = <T>(data: T): T => JSON.parse(JSON.stringify(data));

    protected sort = <T, Y>(items: T[], attribute: Y): T[] => items.sort((a: T, b: T): number =>  a[`${String(attribute)}`] - b[`${String(attribute)}`]);

    protected generateFourDigitRandomNumber = (): number => Math.floor(1000 + Math.random() * 9000); // generates a 4 digit random code, 4321

    protected formatFourDigitRandomNumber = (number: number): string => number.toString().split('').join('-'); // format otp like 4-3-2-1
 
    // Validate is date is old in minutes given in second params
    protected validateDateIsOld = (date: Date, number: number): boolean => {
        const givenDate: Date = new Date(date);
        const currentDate: Date = new Date();

        // Calculate the difference in milliseconds
        const differenceInMs = currentDate.getTime() - givenDate.getTime();

        // Convert milliseconds to minutes (1 minute = 60 * 1000 milliseconds)
        const differenceInMinutes = differenceInMs / (1000 * 60);

        if (differenceInMinutes > number) {
            return false;
        } 
        return true;
    }

}
