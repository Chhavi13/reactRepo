import  axios, { AxiosResponse } from 'axios';
import axiosInstance from "./axios"

const environment: string | undefined = 'https://admin.tokuten.ai/api/v1';
//const environment: string | undefined = 'https://15f1-223-236-21-148.ngrok.io/api/v1/';

export default {
  async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.get<T>(
      `${endpoint}`,
    );
    return response;
  },
  
  async post<T>(endpoint: string, data: T,progress?:any): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(
      `${endpoint}`,
      data,
      progress
    );
    return response;
    
  },
  
  async put<T, D>(endpoint: string, data: D,progress?:any): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.put<T>(
      `${endpoint}`,
      data,
      progress
    );
    return response;
  },
  
  async patch<T, D>(endpoint: string, data: D): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.patch<T>(
      `${environment}/${endpoint}`,
      data,
    );
    return response;
  },

  async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.delete<T>(
      `${endpoint}`,
    );
    return response;
  },

  async upload<T>(
    endpoint: string,
    key: string = 'file',
    file: Blob,
  ): Promise<AxiosResponse<T>> {
    const formData: FormData = new FormData();
    formData.append(key, file);
    const response: AxiosResponse<T> = await axiosInstance.post<T>(
      `${environment}/${endpoint}`,
      formData,
      {
        headers: { 'Content-type': 'multipart/form-data' },
      },
    );
    return response;
  },
};
