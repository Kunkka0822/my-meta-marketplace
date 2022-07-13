export const serializeToQuery = (
    obj: Record<string, any>,
    prefix: string = ''
): string => {
    const str = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + '[' + p + ']' : p,
                v = obj[p];
            str.push(
                v !== null && typeof v === 'object'
                    ? serializeToQuery(v, k)
                    : encodeURIComponent(k) + '=' + encodeURIComponent(v)
            );
        }
    }
    return str.join('&');
};

export const getUrlWithParam = (
    baseUrl: string,
    params: Record<string, any>
): string => {
    const Url = new URL(baseUrl);
    Url.search = serializeToQuery(params);
    return Url.toString();
};

export const getAbsoluteUrl = (url: string, baseUrl = '') => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    if (!url.startsWith('/')) {
        url = `/${url}`;
    }
    return `${baseUrl}${url}`;
};

export const getAppBaseUrl = (url: string) => {
    return process.env.REACT_APP_BASE_URL + url;
};

export function findGetParameter(parameterName: string) {
    var result = null,
        tmp = [];
    // eslint-disable-next-line no-restricted-globals
    var items = location.search.substr(1).split('&');
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split('=');
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}
