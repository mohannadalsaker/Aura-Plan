import axiosInstance from "./axios";

export const fetcher = async <T>(url: string, config?: object): Promise<T> => {
  const response = await axiosInstance.get<T>(url, {
    ...config,
    method: "GET",
  });
  return response.data;
};
