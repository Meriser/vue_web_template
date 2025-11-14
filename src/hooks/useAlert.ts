import Swal from "sweetalert2";
import { color } from "@/colors/color";

export interface AlertProps {
  title: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  text?: string;
  html?: string;
  timer?: number;
  timerProgressBar?: boolean;
  backdrop?: boolean;
  position?:
    | "top"
    | "top-start"
    | "top-end"
    | "center"
    | "center-start"
    | "center-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end";
  toast?: boolean;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  input?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "range"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "url";
  inputValue?: string;
  inputPlaceholder?: string;
  confirmCb?: (result: string) => void;
  cancelCb?: () => void;
  inputValidator?: (value: string) => string | undefined;
}

// 顯示彈窗提示
export default function useAlert() {
  const showAlert = ({
    title,
    text,
    icon,
    html,
    timer,
    timerProgressBar = false,
    backdrop = true,
    position = "center",
    toast = false,
    showCloseButton = false,
    showConfirmButton = true,
    showCancelButton = false,
    confirmButtonText = "確認",
    cancelButtonText = "取消",
    confirmButtonColor = color.primary,
    cancelButtonColor = color.danger,
    input,
    inputValue,
    inputPlaceholder,
    confirmCb,
    cancelCb,
    inputValidator,
  }: AlertProps) => {
    Swal.fire({
      title,
      text,
      icon,
      html,
      timer,
      timerProgressBar,
      backdrop,
      position,
      toast,
      showCloseButton,
      showConfirmButton,
      showCancelButton,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor,
      cancelButtonColor,
      input,
      inputValue,
      inputPlaceholder,
      inputValidator,
      customClass: {
        container: "custom-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCb && confirmCb(result.value);
      } else if (result.isDismissed) {
        cancelCb && cancelCb();
      }
    });
  };

  return { showAlert };
}
