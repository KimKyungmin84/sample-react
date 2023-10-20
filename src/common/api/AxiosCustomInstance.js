import axios from "axios";
import { URL } from "../constants/url";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const AxiosCustomInstance = (options) => {
  const {
    headers = {},
    // baseURL = URL.HOME,
    timeout = 5000,
    skipInterceptor = false,
    skipResponseInterceptor = false
  } = options;

  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
    "Cache-Control": "no-cache, no-store, must-revalidate", // HTTP 1.1.
    Pragma: "no-cache", // HTTP 1.0.
    Expires: "0" // Proxies.
  };

  const axiosInstance = axios.create({
    ...options,
    timeout,
    headers: mergedHeaders,
  });

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.skipInterceptor) {
        console.log("Interceptor skipped for config:", config);
        return config;
      }
      console.log("Request Interceptor:", config);
      return config;
    },
    (error) => {
      console.log("Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.config.skipResponseInterceptor) {
        console.log("Interceptor skipped for response:", response);
        return response;
      }
      console.log("Response Interceptor:", response);
      return response;
    },
    (error) => {
      console.log("Response Interceptor Error:", error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default AxiosCustomInstance;
