import  { AxiosResponse } from "axios";
import  axiosInstance  from "./axios";

export default {
    async get<T>(endpoint: String): Promise<AxiosResponse<T>> {
        const response: AxiosResponse<T> = await axiosInstance.get<T>(
            `${endpoint}`,
        );
        return response;
    },
    async post<T>(endpoint:string,data?:any):Promise<AxiosResponse<T>>{
        const response: AxiosResponse<T> = await axiosInstance.post<T>(
            `${endpoint}`,
            data,
          );
          return response;
    }
}