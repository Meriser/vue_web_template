/**
 * 過濾掉空值的查詢參數
 * @param params - 原始參數物件
 * @returns 過濾後的參數物件
 */
export const filterQueryParams = <T extends Record<string, any>>(
  params: T
): Partial<T> => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    // 只保留有值的參數（排除空字串、undefined、null、-1）
    if (
      value !== "" &&
      value !== undefined &&
      value !== null &&
      value !== -1
    ) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};
