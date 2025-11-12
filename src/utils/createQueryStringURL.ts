/**
 * 將一個物件參數轉換為 URI 查詢字串（不包含問號 ?）
 *
 * 支援的值類型：
 * - string、number、boolean
 * - 陣列（string[]、number[]）：如果傳遞空陣列，將忽略該參數
 * - undefined 或 null 的屬性會被略過
 *
 * @param params 物件型參數
 * @returns 編碼後的查詢字串（不包含開頭的 '?'）
 *
 * @example
 *  範例: 各類型都包含
 * const params = {
 *   user: "Bob",
 *   id: 99,
 *   enabled: false,
 *   tags: ["new", "hot"],
 *   unused: [],
 *   remark: undefined,
 * };
 * 
 * console.log(createQueryStringURL(params1)); 
 * 輸出: "user=Bob&id=99&enabled=false&tags=new,hot"
 */

export const createQueryStringURL = (
  params: Record<
    string,
    number | string | boolean | number[] | string[] | undefined
  >
) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    // 忽略 undefined 和 null 值，不納入查詢參數
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      // 陣列值：將非空陣列合併為逗號分隔字串後加入查詢參數
      if (value.length > 0) {
        searchParams.set(key, value.join(","));
      }
    } else {
      // 一般值：直接轉字串後加入查詢參數
      searchParams.set(key, value.toString());
    }
  });

  return searchParams.toString();
};


