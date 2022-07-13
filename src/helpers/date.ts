import moment from "moment";

export const normalizeDate = (date: string | undefined | null) => {
    if (!date) return '';
    return moment(date).format('YYYY/MM/DD');
}
export const normalizeDateTime = (date: string | undefined | null) => {
    if (!date) return '';
    return moment(date).format('YYYY/MM/DD HH:ss');
}

export const _convertTimeHumanReadable = (date: string | null | undefined) => {
    if (!date) return '';
    const segs = date.split(' ');
    if (segs.length > 1) {
        date = segs[0] + 'T' + segs[1];
    }
    const data = moment(date);
    const now = moment();
    let result = '';
    if (data.format('YYYY') !== now.format('YYYY')) {
        result = result + data.format('YYYY');
    }
    result = result + data.format('MM/DD');
    return result;
};
  
export const convertTimeHumanReadable = (date: string | null | undefined) => {
    if (!date) return '';
    const now = moment();
    const data = moment(date);
    const duration = moment.duration(data.diff(now))
    if (duration.days() < -1) {
      return _convertTimeHumanReadable(date);
    }
    return duration.humanize(true);
}
  
export const convertMessageTime = (date: string | null | undefined) => {
    if (!date) return '';
    const segs = date.split(' ');
    if (segs.length > 1) {
        date = segs[0] + 'T' + segs[1];
    }
    const data = moment(date);
    const now = moment();
    let result = '';
    if (data.format('YYYY') !== now.format('YYYY')) {
        result = result + data.format('YYYY');
    }
    result = result + data.format('MM/DD HH:MM');
  
    return result;
}
  