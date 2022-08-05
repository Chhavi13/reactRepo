import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://admin.tokuten.ai/api/v1/"
  //baseURL: "https://9995-223-236-21-148.ngrok.io/api/v1/"
});

// request header
axiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      config.headers = {
        Authorization: `Token ${authToken}`,
        Accept: "application/json"
      };
    }
    return config;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);
axiosInstance.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    console.log("Network error - make sure API is running!");
  }
  if (error.response) {
    const { status } = error.response;
  if (status === 404) {
      console.log("Not Found");
    }
    if (status === 401) {
      localStorage.clear();
      window.location.href = "/";
      console.log("Your session has expired, please login again");
    }
    return error;
  } else {
    // throw transformError(error);
  }
});

export default axiosInstance;

function transformError(error: any) {
  throw new Error("Function not implemented.");
}
