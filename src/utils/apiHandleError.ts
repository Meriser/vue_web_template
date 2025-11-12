import axios from "axios";

export default function ApiHandleError(
  e: unknown,
  functionName?: string
): never {
  let errorMessage = functionName ? `${functionName}, ` : "Api Error, ";

  if (axios.isAxiosError(e)) {
    // 提取最常見錯誤訊息
    const response = e.response;
    if (response?.data) {
      // 嘗試常見結構 extraction
      if (typeof response.data === "string") {
        errorMessage += response.data;
      } else if (typeof response.data === "object") {
        // 試著抓 result/data/message/error 這些常見的 error 格式
        const data = response.data as Record<string, any>;

        // 有 message
        if (data.message) {
          errorMessage += data.message;
        }
        // 有 error
        else if (data.error) {
          errorMessage += data.error;
        }
        // 有 data 裡面的 message
        else if (
          data.data &&
          typeof data.data === "object" &&
          data.data.message
        ) {
          errorMessage += data.data.message;
        }
        // 有 data 裡面的第一個值
        else if (
          data.data &&
          typeof data.data === "object" &&
          Object.values(data.data).length > 0
        ) {
          errorMessage += Object.values(data.data)[0];
        }
        // fallback: 直接抓 JSON 字串
        else {
          errorMessage +=
            JSON.stringify(response.data) || "Unknown error detail";
        }
      } else {
        errorMessage += "Unknown error detail";
      }
    } else {
      errorMessage += e.message || "No response data";
    }
    throw new Error(errorMessage);
  }

  // 非 Axios 錯誤或無法辨識
  throw new Error(
    functionName
      ? `${functionName}, An unexpected error occurred`
      : "An unexpected error occurred"
  );
}
