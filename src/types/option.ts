// 選項類型
export type OptionType<T extends string | number | boolean | number[]> = {
  label: string;
  value: T;
};