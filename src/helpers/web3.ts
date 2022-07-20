import _ from 'lodash';

export const truncateAddress = (address: string) => {
    return _.truncate(address, { omission: '...', length: 10 });
}