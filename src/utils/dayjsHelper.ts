import dayjs from 'dayjs';

/**
 * 用於指定日期格式化的類型
 * - 'startOfDay'：回傳當天起始時間的 timestamp
 * - 'endOfDay'：回傳當天結束時間的 timestamp
 * - 'valueOf'：回傳該時間的 timestamp（預設）
 */
export type getFormatDayType = 'startOfDay' | 'endOfDay' | 'valueOf';

/**
 * 取得格式化後的日期 timestamp
 * @param date 傳入的日期（可接受 string, number, Date, dayjs, null, undefined）
 * @param type 需回傳的時間種類，預設為 'valueOf'
 * @returns number 格式化後的 timestamp
 */
export const getFormatDay = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  type: getFormatDayType = 'valueOf',
) => {
  // 如果 type 是 'startOfDay'，回傳該日期的起始時間 timestamp
  if (type === 'startOfDay') {
    return dayjs(date).startOf('day').valueOf();
  }

  // 如果 type 是 'endOfDay'，回傳該日期的結束時間 timestamp
  if (type === 'endOfDay') {
    return dayjs(date).endOf('day').valueOf();
  }

  // 預設回傳傳入日期的 timestamp
  return dayjs(date).valueOf();
};
