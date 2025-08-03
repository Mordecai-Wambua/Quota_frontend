import { useRef } from "react";
import { toast } from "react-hot-toast";

type ToastType = "success" | "error" | "loading";

export const useSmartToast = () => {
  const toastIdRef = useRef<string | null>(null);

  const show = (message: string) => {
    toastIdRef.current = toast.loading(message);
  };

  const update = (message: string, type: ToastType = "success") => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
    toast[type](message);
  };

  const dismiss = () => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  };

  return { show, update, dismiss };
};
