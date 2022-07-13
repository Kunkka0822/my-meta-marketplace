import _ from 'lodash';

export const camelCaseKeys = (
    obj: Record<string, any>
): Record<string, any> | Array<any> => {
    if (Array.isArray(obj)) {
        return obj.map((v) => camelCaseKeys(v));
    } else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [_.camelCase(key)]: camelCaseKeys(obj[key]),
            }),
            {}
        );
    }
    return obj;
};

export const snakeCaseKeys = (
    obj: Record<string, any> | Array<any>
): Record<string, any> | Array<any> => {
    if (Array.isArray(obj)) {
        return obj.map((v) => snakeCaseKeys(v));
    } else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [_.snakeCase(key)]: snakeCaseKeys(obj[key]),
            }),
            {}
        );
    }
    return obj;
};
