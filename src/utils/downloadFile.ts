/**
 * 下載檔案的通用函式
 * @param blob - 要下載的檔案內容，以 Blob 物件形式傳入
 * @param filename - 下載後的檔案名稱
 */
export function downloadFile(blob: Blob, filename: string) {
  // 建立 Blob URL
  const url = window.URL.createObjectURL(blob);
  // 建立暫時的下載連結
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  // 將連結加入 DOM 並觸發點擊
  document.body.appendChild(link);
  link.click();
  // 移除暫時的下載連結
  document.body.removeChild(link);
  // 釋放 Blob URL
  window.URL.revokeObjectURL(url);
}
