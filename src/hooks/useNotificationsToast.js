import { useCallback, useState } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(function (message, type = "success") {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(function () {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
}
