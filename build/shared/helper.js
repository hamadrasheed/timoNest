"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
class Helper {
    constructor() {
        this.deleteAttributes = (keys, obj) => {
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
        };
        this.filterNonEmpty = (arr) => arr.filter((value) => JSON.stringify(value) !== '[]');
        this.filterNonNull = (arr) => arr.filter((e) => e !== null && e !== undefined);
        this.filterUnique = (data) => data.filter((v, i, a) => a.indexOf(v) === i);
        this.groupByType = (data, field) => data.reduce((acc, c) => {
            const type = c[`${field}`];
            acc[type] ? acc[type].push(c) : (acc[type] = [c]);
            return acc;
        }, {});
        this.paginate = (array, page_size, page_number) => array.slice((page_number - 1) * page_size, page_number * page_size);
        this.shallowCopy = (data) => JSON.parse(JSON.stringify(data));
        this.sort = (items, attribute) => items.sort((a, b) => a[`${String(attribute)}`] - b[`${String(attribute)}`]);
        this.generateFourDigitRandomNumber = () => Math.floor(1000 + Math.random() * 9000);
        this.formatFourDigitRandomNumber = (number) => number.toString().split('').join('-');
        this.validateDateIsOld = (date, number) => {
            const givenDate = new Date(date);
            const currentDate = new Date();
            const differenceInMs = currentDate.getTime() - givenDate.getTime();
            const differenceInMinutes = differenceInMs / (1000 * 60);
            if (differenceInMinutes > number) {
                return false;
            }
            return true;
        };
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map