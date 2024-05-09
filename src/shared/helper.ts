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

}
