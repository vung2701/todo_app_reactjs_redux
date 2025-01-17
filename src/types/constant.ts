import dayjs from "dayjs";

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const MONTH_FORMAT = 'MM/YYYY';

export const TODAY = dayjs().format(DATE_FORMAT);