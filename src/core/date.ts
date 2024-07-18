/**
 * @name dateFormatter
 * @description 입력 받은 Date 객체의 날짜를 'YYYY-MM-DD' 문자로 반환합니다.
 *
 * @param {Date} date
 * @returns {string}
 */
export const dateFormatter = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dd = date.getDate();

  return `${year}-${month < 10 ? '0' + month : month}-${dd < 10 ? '0' + dd : dd}`;
};

/**
 * @name datetimeFormatter
 * @description 입력 받은 Date 객체의 날짜를 'YYYY-MM-DDTHH-MM' 문자로 반환합니다.
 *
 * @param {Date} date
 * @returns {string}
 */
export const datetimeFormatter = (date: Date): string => {
  const hour = date.getHours();
  const min = date.getMinutes();

  return `${dateFormatter(date)}T${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}`;
};

export const resetDatetime = (date: Date): Date => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
};

