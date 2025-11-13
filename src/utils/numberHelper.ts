/**
 * 數字加上千分位符號
 * @param num 數字
 * @returns 加上千分位後的字串
 */
export function numberComma(num: number): string {
  // 使用正則表達式，找出千分位要插入逗號的位置
  // 說明：
  // - \B           ：非單詞邊界（避免頭部插入逗號）
  // - (?<!\.\d*)   ：負向前瞻，不在小數點及小數位數之後
  // - (?=(\d{3})+(?!\d))：向右看 3 的倍數位數前有數字，且不是後面還有更多位數
  const comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
  // 將數字轉字串，依照正則插入逗號
  return num.toString().replace(comma, ",");
}

/**
 * 將小數(0~1間)轉換為百分比字串，保留指定小數位
 * @param value 小數數值
 * @param fractionDigits 保留小數位數，預設2位
 * @param unit 單位，預設%
 * @returns 百分比字串 (例: 0.155=> "15.50%")
 */

export function decimalToPercentage(
  value: number,
  fractionDigits: number = 2,
  unit: string = '%',
): string {
  if (typeof value !== 'number' || isNaN(value)) return '';
  // 直接向下取小數，不做四捨五入
  const factor = Math.pow(10, fractionDigits);
  const floored = Math.floor(value * 100 * factor) / factor;
  return floored.toFixed(fractionDigits) + (unit ? ` ${unit}` : '');
}

// 將小數(0~1間)轉為百分比數值（無單位，取兩位小數）
// 例: 0.1567 => 15.67
export function decimalToPercentageValue(
  value: number,
  fractionDigits: number = 2,
): number {
  if (typeof value !== 'number' || isNaN(value)) return 0;
  const factor = Math.pow(10, fractionDigits);
  return Math.floor(value * 100 * factor) / factor;
}
