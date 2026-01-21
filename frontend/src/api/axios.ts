import type { ErrorResponse } from "@/shared/types";
import { getLsValue, removeLsValue } from "@/shared/utils";
import { useSnackBarStore } from "@/stores/modules/snackbar/snackbar";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getLsValue("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["ngrok-skip-browser-warning"] = "true";
  config.headers["apiKey"] =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const { openSnackBar } = useSnackBarStore.getState();
    openSnackBar({
      message: error.response?.data?.message || "An error has occured",
      type: "error",
    });
    if (error.status === 401) {
      removeLsValue("token");
      // window.location.assign("/auth/login");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
